"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Rocket, CheckCircle } from 'lucide-react';
import axios from 'axios';
import Link from 'next/link';

interface Props {
  courseId: number;
}

interface ResumeData {
  courseId: number;
  chapterId: number;
  exerciseSlug: string;
  completed: boolean;
  firstLessonSlug?: string;
}

export default function ContinueCard({ courseId }: Props) {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch sequential progress data to identify either the next lesson or completion
  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const response = await axios.post('/api/user-resume', { courseId });
        setResumeData(response.data);
      } catch (error) {
        console.error("Error fetching course resume data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (courseId) fetchResumeData();
  }, [courseId]);

  if (loading) {
    return (
      <div className="h-10 w-40 bg-zinc-800/50 animate-pulse rounded-md mt-4" />
    );
  }

  // Define navigational target: Resume point or Review (first lesson)
  const isCompleted = resumeData?.completed;
  const targetSlug = isCompleted ? resumeData?.firstLessonSlug : resumeData?.exerciseSlug;

  if (!targetSlug || !resumeData) return null;

  return (
    <Link 
      href={`/courses/${resumeData.courseId}/${resumeData.chapterId}/${targetSlug}`}
      className="inline-block mt-4"
    >
      <Button 
        variant="pixel" 
        className={`font-game flex items-center gap-2 group transition-all active:scale-95 shadow-lg px-6 h-10 ${
           isCompleted 
           ? "bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300 shadow-zinc-950" 
           : "shadow-yellow-500/10"
        }`}
      >
        {isCompleted ? (
           <>
             <CheckCircle className="w-4 h-4 text-emerald-500/80" />
             Review Course
           </>
        ) : (
           <>
             <Rocket className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
             Continue Quest
           </>
        )}
      </Button>
    </Link>
  );
}
