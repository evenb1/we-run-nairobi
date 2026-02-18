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

function sanitizeName(name: string) {
  return name
    .replace(/[^\p{L}\p{N}\s.'-]/gu, '')  // keep only letters, numbers, spaces, and basic punctuation
    .replace(/\s+/g, ' ')
    .trim();
}

function getAvatar(firstname: string, lastname: string) {
  return `https://i.pravatar.cc/150?u=${firstname}${lastname}`;
}

export async function GET(request: NextRequest) {
  const secret = request.headers.get('x-cron-secret');
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const accessToken = await getAccessToken();
    const allActivities: any[] = [];
    let page = 1;

    while (true) {
      const res = await fetch(
        `https://www.strava.com/api/v3/clubs/${STRAVA_CLUB_ID}/activities?per_page=200&page=${page}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const batch = await res.json();

      if (!Array.isArray(batch) || batch.length === 0) break;

      allActivities.push(...batch);

      if (batch.length < 200) break;
      page++;
    }

    // --- Recent Activities (last 6) ---
    const recentActivities = allActivities.slice(0, 6).map((activity: any) => {
      const distanceKm = (activity.distance / 1000).toFixed(1);
      const totalSeconds = activity.moving_time;
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const paceSeconds = totalSeconds / (activity.distance / 1000);
      const paceMin = Math.floor(paceSeconds / 60);
      const paceSec = Math.floor(paceSeconds % 60);
      const fullName = sanitizeName(
        `${activity.athlete.firstname} ${activity.athlete.lastname}`
      );

      return {
        name: fullName,
        distance: distanceKm,
        time: hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`,
        pace: `${paceMin}'${paceSec.toString().padStart(2, '0')}"`,
        avatar: getAvatar(activity.athlete.firstname, activity.athlete.lastname),
        activityName: activity.name,
      };
    });

    // --- Athlete Stats for Leaderboard + Runner of the Week ---
    const athleteStats: Record<string, any> = {};
    for (const activity of allActivities) {
      const fullName = sanitizeName(
        `${activity.athlete.firstname} ${activity.athlete.lastname}`
      );
      const key = `${activity.athlete.firstname}_${activity.athlete.lastname}`;
      if (!athleteStats[key]) {
        athleteStats[key] = {
          name: fullName,
          avatar: getAvatar(activity.athlete.firstname, activity.athlete.lastname),
          totalKm: 0,
          runs: 0,
        };
      }
      athleteStats[key].totalKm += (activity.distance || 0) / 1000;
      athleteStats[key].runs += 1;
    }

    const sortedAthletes = Object.values(athleteStats).sort(
      (a: any, b: any) => b.totalKm - a.totalKm
    );

    // --- Leaderboard (top 5) ---
    const leaderboard = sortedAthletes.slice(0, 5).map((athlete: any, index: number) => ({
      rank: index + 1,
      name: athlete.name,
      km: parseFloat(athlete.totalKm.toFixed(1)),
      runs: athlete.runs,
      avatar: athlete.avatar,
    }));

    // --- Runner of the Week (most total km) ---
    const runnerOfWeek = sortedAthletes[0] || null;

    const featuredRunner = runnerOfWeek
      ? {
          name: runnerOfWeek.name,
          avatar: runnerOfWeek.avatar,
          distance: runnerOfWeek.totalKm.toFixed(1),
          time: `${runnerOfWeek.runs} run${runnerOfWeek.runs !== 1 ? 's' : ''}`,
          route: 'Runner of the Week',
          location: 'Nairobi, Kenya',
          streak: 'N/A',
        }
      : null;

    // --- Total Stats ---
    const totalDistance = allActivities.reduce(
      (sum: number, a: any) => sum + (a.distance || 0), 0
    );

    const payload = {
      club: {
        name: 'We Run Nairobi',
        memberCount: 3872,
        city: 'Nairobi',
        country: 'Kenya',
      },
      stats: {
        totalDistanceThisWeek: (totalDistance / 1000).toFixed(0),
        activitiesCount: allActivities.length,
      },
      recentActivities,
      leaderboard,
      featuredRunner,
      lastUpdated: new Date().toISOString(),
    };

    await redis.set('strava:weekly', JSON.stringify(payload), { ex: 7200 });

    return NextResponse.json({
      ok: true,
      activitiesFetched: allActivities.length,
      pages: page,
      lastUpdated: payload.lastUpdated,
    });

  } catch (error: any) {
    console.error('Strava sync error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}