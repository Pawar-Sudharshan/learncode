import React from 'react';
import { Progress } from "@/components/ui/progress";

interface Props {
  percentage: number;
}

export default function CourseProgress({ percentage }: Props) {
  return (
    <div className="w-full mt-4">
      <div className="flex justify-between items-center mb-2 px-1">
        <span className="text-[10px] font-game text-zinc-500 uppercase tracking-[0.2em]">Course Mastery</span>
        <span className="text-xs font-mono text-zinc-300 font-bold">{percentage}%</span>
      </div>
      <Progress 
        value={percentage} 
        className="h-2 bg-zinc-800"
      />
    </div>
  );
}
