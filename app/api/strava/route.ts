import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const fallback = {
  club: { name: 'We Run Nairobi', memberCount: 3872, city: 'Nairobi', country: 'Kenya' },
  stats: { totalDistanceThisWeek: '0', activitiesCount: 0 },
  recentActivities: [],
  leaderboard: [],
  featuredRunner: null,
  lastUpdated: null,
};

export async function GET() {
  try {
    const cached = await redis.get('strava:weekly');
    if (!cached) {
      return NextResponse.json(fallback);
    }
    const data = typeof cached === 'string' ? JSON.parse(cached) : cached;
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Redis read error:', error);
    return NextResponse.json(fallback);
  }
}