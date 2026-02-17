import { NextResponse } from 'next/server';

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

export async function GET() {
  try {
    const accessToken = await getAccessToken();

    // Fetch club details
    const clubResponse = await fetch(
      `https://www.strava.com/api/v3/clubs/${STRAVA_CLUB_ID}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    if (!clubResponse.ok) throw new Error(`Club fetch failed: ${clubResponse.status}`);
    const clubData = await clubResponse.json();

    // Fetch club activities - NOTE: this endpoint only returns basic athlete info
    // (firstname, lastname only - no profile photo, no created_at)
    const activitiesResponse = await fetch(
      `https://www.strava.com/api/v3/clubs/${STRAVA_CLUB_ID}/activities?per_page=30`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    if (!activitiesResponse.ok) throw new Error(`Activities fetch failed: ${activitiesResponse.status}`);
    const activities = await activitiesResponse.json();

    // Generate a consistent avatar from name (uses pravatar with name as seed)
    const getAvatar = (firstname: string, lastname: string) =>
      `https://i.pravatar.cc/150?u=${firstname}${lastname}`;

    // Recent activities - only use fields that actually exist
    const recentActivities = activities.slice(0, 6).map((activity: any) => {
      const distanceKm = (activity.distance / 1000).toFixed(1);
      const totalSeconds = activity.moving_time;
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);

      // Pace in min/km
      const paceSeconds = totalSeconds / (activity.distance / 1000);
      const paceMin = Math.floor(paceSeconds / 60);
      const paceSec = Math.floor(paceSeconds % 60);

      return {
        name: `${activity.athlete.firstname} ${activity.athlete.lastname}`,
        distance: distanceKm,
        time: hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`,
        pace: `${paceMin}'${paceSec.toString().padStart(2, '0')}"`,
        avatar: getAvatar(activity.athlete.firstname, activity.athlete.lastname),
        activityName: activity.name,
      };
    });

    // Leaderboard - group by athlete name (no ID available from this endpoint)
    const athleteStats: Record<string, any> = {};
    for (const activity of activities) {
      const key = `${activity.athlete.firstname}_${activity.athlete.lastname}`;
      if (!athleteStats[key]) {
        athleteStats[key] = {
          name: `${activity.athlete.firstname} ${activity.athlete.lastname}`,
          avatar: getAvatar(activity.athlete.firstname, activity.athlete.lastname),
          totalKm: 0,
          runs: 0,
        };
      }
      athleteStats[key].totalKm += (activity.distance || 0) / 1000;
      athleteStats[key].runs += 1;
    }

    const leaderboard = Object.values(athleteStats)
      .sort((a: any, b: any) => b.totalKm - a.totalKm)
      .slice(0, 5)
      .map((athlete: any, index: number) => ({
        rank: index + 1,
        name: athlete.name,
        km: parseFloat(athlete.totalKm.toFixed(1)),
        runs: athlete.runs,
        avatar: athlete.avatar,
      }));

    // Total distance across all fetched activities
    const totalDistance = activities.reduce(
      (sum: number, a: any) => sum + (a.distance || 0), 0
    );

    // Featured runner - whoever has the longest single activity
    const longestActivity = [...activities].sort(
      (a: any, b: any) => b.distance - a.distance
    )[0];

    let featuredRunner = null;
    if (longestActivity) {
      const distanceKm = (longestActivity.distance / 1000).toFixed(1);
      const totalSecs = longestActivity.moving_time;
      const hours = Math.floor(totalSecs / 3600);
      const minutes = Math.floor((totalSecs % 3600) / 60);

      featuredRunner = {
        name: `${longestActivity.athlete.firstname} ${longestActivity.athlete.lastname}`,
        avatar: getAvatar(longestActivity.athlete.firstname, longestActivity.athlete.lastname),
        distance: distanceKm,
        time: hours > 0 ? `${hours}:${minutes.toString().padStart(2, '0')}h` : `${minutes}m`,
        route: longestActivity.name || 'Morning Run',
        location: longestActivity.name || 'Nairobi',
        streak: longestActivity.total_elevation_gain
          ? `${Math.round(longestActivity.total_elevation_gain)}m elev`
          : 'N/A',
      };
    }

    return NextResponse.json({
      club: {
        name: clubData.name,
        memberCount: clubData.member_count,
        city: clubData.city,
        country: clubData.country,
      },
      stats: {
        totalDistanceThisWeek: (totalDistance / 1000).toFixed(0),
        activitiesCount: activities.length,
      },
      recentActivities,
      leaderboard,
      featuredRunner,
    });

  } catch (error: any) {
    console.error('Strava API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Strava data', message: error.message },
      { status: 500 }
    );
  }
}