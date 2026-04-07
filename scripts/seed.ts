import { config } from 'dotenv';
config({ path: '.env.local' });
import { db } from '../config/db';
import { courses } from '../config/schema';

const sampleCourses = [
  {
    courseId: 1,
    title: 'Introduction to React',
    description: 'Learn the basics of React, including components, props, and state. Perfect for beginners.',
    banner: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop',
    level: 'beginner',
    tag: 'Frontend',
  },
  {
    courseId: 2,
    title: 'Advanced Next.js Mastery',
    description: 'Master server-side rendering, static site generation, and the new App router in Next.js.',
    banner: 'https://images.unsplash.com/photo-1618477247222-ac60c6248d28?q=80&w=800&auto=format&fit=crop',
    level: 'advanced',
    tag: 'Fullstack',
  },
  {
    courseId: 3,
    title: 'Tailwind CSS in 1 Hour',
    description: 'Quickly style your web applications using Tailwind CSS. We will build a beautiful landing page from scratch.',
    banner: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop',
    level: 'beginner',
    tag: 'CSS',
  },
  {
    courseId: 4,
    title: 'Fullstack Development with Drizzle and Neon',
    description: 'A comprehensive guide to building a modern, serverless Postgres database using Neon, Drizzle ORM, and Next.js.',
    banner: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    level: 'intermediate',
    tag: 'Database',
  }
];

async function seed() {
  try {
    console.log('Seeding database...');

    for (const course of sampleCourses) {
      await db.insert(courses).values(course).onConflictDoNothing({ target: courses.courseId });
      console.log(`Attempted to seed via onConflictDoNothing: ${course.title}`);
    }
    console.log('Database seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
