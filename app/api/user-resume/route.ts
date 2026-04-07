import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/config/db';
import { courseChapters, completedExercise } from '@/config/schema';
import { currentUser } from '@clerk/nextjs/server';
import { eq, and, asc } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const { courseId } = await req.json();
    const user = await currentUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress;

    if (!userEmail) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 1. Fetch all course chapters in sequential order (Chapter 1 -> Chapter N)
    const chapters = await db.select()
      .from(courseChapters)
      .where(eq(courseChapters.courseId, parseInt(courseId)))
      .orderBy(asc(courseChapters.chapterId));

    // 2. Fetch all completed exercises for this specific course and user
    const completedList = await db.select()
      .from(completedExercise)
      .where(
        and(
          eq(completedExercise.courseId, parseInt(courseId)),
          eq(completedExercise.userId, userEmail)
        )
      );

    const completedSlugs = completedList.map(ce => ce.exerciseId);

    // 3. Logic: Find the earliest exercise that has NOT been completed
    let nextExercise = null;

    for (const chapter of chapters) {
      // Ensure exercises are checked in order within the chapter
      const exercises = (chapter.exercises as any[]) || [];
      for (const ex of exercises) {
        if (!completedSlugs.includes(ex.slug)) {
          nextExercise = {
            courseId: parseInt(courseId),
            chapterId: chapter.chapterId,
            exerciseSlug: ex.slug
          };
          break;
        }
      }
      if (nextExercise) break;
    }

    // Reference data for the "Review Course" feature (first lesson)
    const firstChapter = chapters[0];
    const firstExSlug = (firstChapter?.exercises as any[])?.[0]?.slug;

    // 4. Return special completion status if all lessons are finished
    if (!nextExercise) {
      return NextResponse.json({
        completed: true,
        firstLessonSlug: firstExSlug,
        courseId: parseInt(courseId),
        chapterId: firstChapter?.chapterId
      });
    }

    // Standard response for resubmitting active quests
    return NextResponse.json({
      ...nextExercise,
      completed: false
    });
  } catch (error) {
    console.error("Error finding resume quest stats:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
