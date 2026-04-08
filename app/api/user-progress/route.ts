import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/config/db';
import { enrollCourse, courses, courseChapters, completedExercise } from '@/config/schema';
import { currentUser } from '@clerk/nextjs/server';
import { eq, and, inArray, asc } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    const user = await currentUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress;

    if (!userEmail) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 1. Fetch basic enrollment records for the user
    const enrolledCourses = await db.select()
      .from(enrollCourse)
      .where(eq(enrollCourse.userId, userEmail));
    
    if (enrolledCourses.length === 0) return NextResponse.json([]);

    const courseIds = enrolledCourses.map(c => c.courseId);

    // 2. Fetch full course metadata for the enrolled IDs
    const courseTableResults = await db.select()
      .from(courses)
      .where(inArray(courses.courseId, courseIds));

    // 3. Fetch all chapters associated with these courses to compute exercise counts
    const chapters = await db.select()
      .from(courseChapters)
      .where(inArray(courseChapters.courseId, courseIds))
      .orderBy(asc(courseChapters.chapterId));

    // 4. Fetch all exercises the user has completed across these specific courses
    const completed = await db.select()
      .from(completedExercise)
      .where(
        and(
          inArray(completedExercise.courseId, courseIds),
          eq(completedExercise.userId, userEmail)
        )
      );

    // 5. Backend Aggregation: Flatten the complex relational data into a clean dashboard-ready response
    const formattedResult = courseTableResults.map(course => {
      const courseEnrollInfo = enrolledCourses.find(e => e.courseId === course.courseId);
      const courseChaptersList = chapters.filter(ch => ch.courseId === course.courseId);
      const courseCompletedList = completed.filter(cx => cx.courseId === course.courseId);

      // Calculating total exercises by iterating through chapter JSON metadata
      const totalExercises = courseChaptersList.reduce((acc, chapter) => {
        const exercisesCount = Array.isArray(chapter.exercises) ? chapter.exercises.length : 0;
        return acc + exercisesCount;
      }, 0);

      const completedCount = courseCompletedList.length;

      return {
        courseId: course.courseId,
        title: course.title,
        banner: course.banner,
        totalExercises,
        completedExercises: completedCount,
        xpEarned: courseEnrollInfo?.xpEarned || 0,
        level: course.level || 'beginner'
      };
    });

    return NextResponse.json(formattedResult);
  } catch (error) {
    console.error("Error in aggregated user-progress API:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
