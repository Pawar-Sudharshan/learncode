import { NextResponse } from 'next/server';
import { db } from '@/config/db';
import { courses } from '@/config/schema';

export async function GET() {
  try {
    const result = await db.select().from(courses);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching courses", error);
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}
