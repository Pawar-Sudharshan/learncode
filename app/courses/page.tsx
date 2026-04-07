import React from 'react';
import Image from 'next/image';
import CourseList from './_components/CourseList';

export default function CoursesPage() {
  const defaultBannerUrl = "/course-banner.gif"; 
  
  return (
    <div className="w-full">
      {/* Top Banner Section */}
      <div className="relative h-[350px] w-full">
        <Image
          src={defaultBannerUrl.trimEnd()}
          alt="Explore All Courses"
          width={1920}
          height={350}
          className="object-cover w-full h-full absolute"
          priority
        />
        <div className="absolute top-0 w-full h-full p-10 md:px-24 lg:px-36 z-10 bg-gradient-to-r from-black/80 to-transparent flex flex-col justify-center">
          <h1 className="text-6xl font-game text-white drop-shadow-md">Explore All Courses</h1>
          <p className="text-gray-300 mt-4 max-w-lg text-lg drop-shadow-sm">
            Level up your skills with our curated selection of gamified courses across various technologies.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-10 md:px-20 lg:px-32 xl:px-48 pb-20">
        <CourseList />
      </div>
    </div>
  );
}
