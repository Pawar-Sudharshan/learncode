import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/config/db';
import { usersTable } from '@/config/schema';
import { currentUser } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    const user = await currentUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress;

    if (!userEmail) {
       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch the specific user's record based on their verified Clerk email
    const userData = await db.select()
      .from(usersTable)
      .where(eq(usersTable.email, userEmail));

    // Return the user data (including their global 'points') or a default state
    return NextResponse.json(userData[0] || { points: 0 });
  } catch (error) {
    console.error("Error fetching user info:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
