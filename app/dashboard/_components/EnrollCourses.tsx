import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function EnrollCourses() {
  return (
    <div className="flex flex-col items-center bg-zinc-900 p-7 rounded-2xl">
      <h2 className="font-game text-2xl mb-4">Your Enrolled Courses</h2>
      <Image
        src="/books.png"
        alt="books"
        width={200}
        height={200}
        className="w-[200px] h-[200px] object-contain"
      />
      <p className="text-gray-400 mt-4 text-sm">
        You don&apos;t have any enrolled courses
      </p>
      <Link href="/courses" className="mt-5">
        <Button variant="pixel" className="font-game text-lg">
          Browse all courses
        </Button>
      </Link>
    </div>
  );
}

export default EnrollCourses;
