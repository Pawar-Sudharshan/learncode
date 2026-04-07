import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/config/db';
import { enrollCourse, courses, exercise } from '@/config/schema';
import { currentUser } from '@clerk/nextjs/server';
import { eq, and } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    const user = await currentUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress;

    if (!userEmail) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 1. Fetch user enrollments joined with course basic details
    const enrollments = await db.select({
      id: enrollCourse.id,
      courseId: courses.courseId,
      title: courses.title,
      banner: courses.banner,
      xpEarned: enrollCourse.xpEarned,
    })
    .from(enrollCourse)
    .innerJoin(courses, eq(enrollCourse.courseId, courses.courseId))
    .where(eq(enrollCourse.userId, userEmail));

    // 2. Real-time Calculation: Fetch total potential XP directly from the exercise table
    const progressData = await Promise.all(enrollments.map(async (enrollment) => {
      // Query all distinct exercises for this course to calculate the current maximum XP
      const courseExercises = await db.select()
        .from(exercise)
        .where(eq(exercise.courseId, enrollment.courseId!));

      let totalPotentialXp = 0;
      courseExercises.forEach((ex: any) => {
        // Extract XP from the content JSON field (synced with the Curriculum)
        const xp = ex.content?.hintXp || 20; // Default to 20 if missing
        totalPotentialXp += xp;
      });

      // Math handled on the backend: Calculate percentage and return to frontend
      const percentage = totalPotentialXp > 0 
        ? Math.round((enrollment.xpEarned! / totalPotentialXp) * 100) 
        : 0;

      return {
        ...enrollment,
        totalXp: totalPotentialXp,
        percentage: percentage > 100 ? 100 : percentage // Cap at 100%
      };
    }));

    return NextResponse.json(progressData);
  } catch (error) {
    console.error("Error in refined user-progress API:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
