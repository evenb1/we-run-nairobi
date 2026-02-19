import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const STRAVA_CLUB_ID = process.env.STRAVA_CLUB_ID;
const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
const STRAVA_REFRESH_TOKEN = process.env.STRAVA_REFRESH_TOKEN;

async function getAccessToken() {
  const response = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: STRAVA_CLIENT_ID!,
      client_secret: STRAVA_CLIENT_SECRET!,
      refresh_token: STRAVA_REFRESH_TOKEN!,
      grant_type: 'refresh_token',
    }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to refresh token');
  return data.access_token;
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getMondayTimestamp(): number {
  const now = new Date();
  const day = now.getUTCDay();
  const diff = (day + 6) % 7;
  const monday = new Date(now);
  monday.setUTCDate(now.getUTCDate() - diff);
  monday.setUTCHours(0, 0, 0, 0);
  return monday.getTime();
}

function getActivityFingerprint(activity: any): string {
  return `${activity.athlete.firstname}_${activity.athlete.lastname}_${activity.distance}_${activity.moving_time}`;
}

export async function GET(request: NextRequest) {
  const secret = request.headers.get('x-cron-secret');
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const accessToken = await getAccessToken();
    const currentMondayTs = getMondayTimestamp();

    let accumulated: {
      weekStart: number;
      seen: string[];
      athletes: Record<string, {
        name: string;
        initials: string;
        totalKm: number;
        runs: number;
      }>;
    } = {
      weekStart: currentMondayTs,
      seen: [],
      athletes: {},
    };

    const stored = await redis.get('strava:accumulated');
    if (stored) {
      const parsed = typeof stored === 'string' ? JSON.parse(stored) : stored;
      if (parsed.weekStart === currentMondayTs) {
        accumulated = parsed;
      } else {
        console.log('New week detected — resetting accumulator');
      }
    }

    const res = await fetch(
      `https://www.strava.com/api/v3/clubs/${STRAVA_CLUB_ID}/activities?per_page=200&page=1`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    const activities = await res.json();

    if (!Array.isArray(activities)) {
      throw new Error('Unexpected response from Strava');
    }

    let newCount = 0;
    for (const activity of activities) {
      const fp = getActivityFingerprint(activity);
      if (accumulated.seen.includes(fp)) continue;

      accumulated.seen.push(fp);
      newCount++;

      const fullName = `${activity.athlete.firstname} ${activity.athlete.lastname}`;
      const key = `${activity.athlete.firstname}_${activity.athlete.lastname}`;

      if (!accumulated.athletes[key]) {
        accumulated.athletes[key] = {
          name: fullName,
          initials: getInitials(fullName),
          totalKm: 0,
          runs: 0,
        };
      }
      accumulated.athletes[key].totalKm += (activity.distance || 0) / 1000;
      accumulated.athletes[key].runs += 1;
    }

    if (accumulated.seen.length > 2000) {
      accumulated.seen = accumulated.seen.slice(-2000);
    }

    const secondsUntilNextMonday = Math.floor(
      (currentMondayTs + 7 * 24 * 60 * 60 * 1000 - Date.now()) / 1000
    ) + 3600;

    await redis.set('strava:accumulated', JSON.stringify(accumulated), {
      ex: secondsUntilNextMonday,
    });

    const sortedAthletes = Object.values(accumulated.athletes).sort(
      (a, b) => b.totalKm - a.totalKm
    );

    const leaderboard = sortedAthletes.slice(0, 5).map((athlete, index) => ({
      rank: index + 1,
      name: athlete.name,
      km: parseFloat(athlete.totalKm.toFixed(1)),
      runs: athlete.runs,
      initials: athlete.initials,
    }));

    const runnerOfWeek = sortedAthletes[0] || null;
    const featuredRunner = runnerOfWeek
      ? {
          name: runnerOfWeek.name,
          initials: runnerOfWeek.initials,
          distance: runnerOfWeek.totalKm.toFixed(1),
          time: `${runnerOfWeek.runs} run${runnerOfWeek.runs !== 1 ? 's' : ''}`,
          location: 'Nairobi, Kenya',
        }
      : null;

    const recentActivities = activities.slice(0, 6).map((activity: any) => {
      const distanceKm = (activity.distance / 1000).toFixed(1);
      const totalSeconds = activity.moving_time;
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const paceSeconds = totalSeconds / (activity.distance / 1000);
      const paceMin = Math.floor(paceSeconds / 60);
      const paceSec = Math.floor(paceSeconds % 60);
      const fullName = `${activity.athlete.firstname} ${activity.athlete.lastname}`;

      return {
        name: fullName,
        distance: distanceKm,
        time: hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`,
        pace: `${paceMin}'${paceSec.toString().padStart(2, '0')}"`,
        initials: getInitials(fullName),
        activityName: activity.name,
      };
    });

    const totalDistance = Object.values(accumulated.athletes).reduce(
      (sum, a) => sum + a.totalKm, 0
    );

    const payload = {
      club: {
        name: 'We Run Nairobi',
        memberCount: 3872,
        city: 'Nairobi',
        country: 'Kenya',
      },
      stats: {
        totalDistanceThisWeek: totalDistance.toFixed(0),
        activitiesCount: accumulated.seen.length,
      },
      recentActivities,
      leaderboard,
      featuredRunner,
      lastUpdated: new Date().toISOString(),
    };

await redis.set('strava:weekly', JSON.stringify(payload), { ex: 86400 });
    return NextResponse.json({
      ok: true,
      newActivities: newCount,
      totalAccumulated: accumulated.seen.length,
      weekStart: new Date(currentMondayTs).toISOString(),
      lastUpdated: payload.lastUpdated,
    });

  } catch (error: any) {
    console.error('Strava sync error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}