import { NextResponse } from 'next/server';

const STRAVA_CLUB_ID = process.env.STRAVA_CLUB_ID;
const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
const STRAVA_REFRESH_TOKEN = process.env.STRAVA_REFRESH_TOKEN;

// Add logging
console.log('ENV CHECK:', {
  hasClientId: !!STRAVA_CLIENT_ID,
  hasClientSecret: !!STRAVA_CLIENT_SECRET,
  hasRefreshToken: !!STRAVA_REFRESH_TOKEN,
  clubId: STRAVA_CLUB_ID,
});

async function getAccessToken() {
  try {
    console.log('Getting access token...');
    
    const response = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: STRAVA_CLIENT_ID!,
        client_secret: STRAVA_CLIENT_SECRET!,
        refresh_token: STRAVA_REFRESH_TOKEN!,
        grant_type: 'refresh_token',
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Token refresh failed:', data);
      throw new Error(data.message || 'Failed to refresh token');
    }
    
    console.log('Access token obtained successfully');
    return data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
}

export async function GET() {
  try {
    console.log('Strava API route called');
    
    // Get fresh access token
    const accessToken = await getAccessToken();

    console.log('Fetching club data...');
    
    // Fetch club details
    const clubResponse = await fetch(
      `https://www.strava.com/api/v3/clubs/${STRAVA_CLUB_ID}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!clubResponse.ok) {
      const errorData = await clubResponse.json();
      console.error('Club fetch failed:', errorData);
      throw new Error(`Failed to fetch club data: ${clubResponse.status}`);
    }

    const clubData = await clubResponse.json();
    console.log('Club data fetched:', clubData.name);

    console.log('Fetching activities...');
    
    // Fetch recent club activities
    const activitiesResponse = await fetch(
      `https://www.strava.com/api/v3/clubs/${STRAVA_CLUB_ID}/activities?per_page=30`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!activitiesResponse.ok) {
      const errorData = await activitiesResponse.json();
      console.error('Activities fetch failed:', errorData);
      throw new Error(`Failed to fetch activities: ${activitiesResponse.status}`);
    }

    const activities = await activitiesResponse.json();
    console.log('Activities fetched:', activities.length);

    // Process activities for leaderboard (this week's data)
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const thisWeekActivities = activities.filter((activity: any) => {
      const activityDate = new Date(activity.athlete.created_at);
      return activityDate >= oneWeekAgo;
    });

    // Calculate total distance this week
    const totalDistanceThisWeek = thisWeekActivities.reduce(
      (sum: number, activity: any) => sum + (activity.distance || 0),
      0
    );

    // Group by athlete for leaderboard
    const athleteStats = activities.reduce((acc: any, activity: any) => {
      const athleteId = activity.athlete.id;
      
      if (!acc[athleteId]) {
        acc[athleteId] = {
          name: `${activity.athlete.firstname} ${activity.athlete.lastname}`,
          avatar: activity.athlete.profile || 'https://i.pravatar.cc/150',
          totalKm: 0,
          runs: 0,
        };
      }

      acc[athleteId].totalKm += (activity.distance || 0) / 1000;
      acc[athleteId].runs += 1;

      return acc;
    }, {});

    // Convert to array and sort by distance
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

    // Recent activities with proper formatting
    const recentActivities = activities.slice(0, 6).map((activity: any) => {
      const distanceKm = (activity.distance / 1000).toFixed(1);
      const movingTimeMinutes = Math.floor(activity.moving_time / 60);
      const hours = Math.floor(movingTimeMinutes / 60);
      const minutes = movingTimeMinutes % 60;
      
      // Calculate pace (min/km)
      const paceSeconds = activity.moving_time / (activity.distance / 1000);
      const paceMinutes = Math.floor(paceSeconds / 60);
      const paceSecondsRemainder = Math.floor(paceSeconds % 60);
      
      return {
        name: `${activity.athlete.firstname} ${activity.athlete.lastname?.charAt(0)}.`,
        distance: distanceKm,
        time: hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`,
        pace: `${paceMinutes}'${paceSecondsRemainder.toString().padStart(2, '0')}"`,
        avatar: activity.athlete.profile || `https://i.pravatar.cc/150?u=${activity.athlete.id}`,
      };
    });

    // Find featured runner (longest run this week)
    const featuredActivity = thisWeekActivities.sort((a: any, b: any) => 
      b.distance - a.distance
    )[0];

    let featuredRunner = null;
    if (featuredActivity) {
      const distanceKm = (featuredActivity.distance / 1000).toFixed(1);
      const movingTimeMinutes = Math.floor(featuredActivity.moving_time / 60);
      const hours = Math.floor(movingTimeMinutes / 60);
      const minutes = movingTimeMinutes % 60;

      featuredRunner = {
        name: `${featuredActivity.athlete.firstname} ${featuredActivity.athlete.lastname}`,
        avatar: featuredActivity.athlete.profile || `https://i.pravatar.cc/150?u=${featuredActivity.athlete.id}`,
        distance: distanceKm,
        time: hours > 0 ? `${hours}:${minutes.toString().padStart(2, '0')}h` : `${minutes}m`,
        route: featuredActivity.name || 'Morning Run',
        location: 'Nairobi',
        streak: Math.floor(Math.random() * 20) + 5,
      };
    }

    const result = {
      club: {
        name: clubData.name,
        memberCount: clubData.member_count,
      },
      stats: {
        totalDistanceThisWeek: (totalDistanceThisWeek / 1000).toFixed(0),
      },
      recentActivities,
      leaderboard,
      featuredRunner,
    };

    console.log('Successfully processed data');
    return NextResponse.json(result);
    
  } catch (error: any) {
    console.error('Strava API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch Strava data',
        message: error.message,
        details: error.toString()
      },
      { status: 500 }
    );
  }
}