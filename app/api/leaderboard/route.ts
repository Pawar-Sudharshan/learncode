import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/config/db';
import { usersTable } from '@/config/schema';
import { desc } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    // 1. Fetch the top 10 users by points across the entire platform
    const leaderboard = await db.select({
      id: usersTable.id,
      name: usersTable.name,
      points: usersTable.points,
    })
    .from(usersTable)
    .orderBy(desc(usersTable.points))
    .limit(10);

    return NextResponse.json(leaderboard);
  } catch (error) {
    console.error("Error fetching platform leaderboard:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
