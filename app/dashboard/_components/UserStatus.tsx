"use client";

import React from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

const stats = [
  {
    label: "Total Rewards",
    value: "20",
    icon: "/star.png",
  },
  {
    label: "Badges",
    value: "0",
    icon: "/badge.png",
  },
  {
    label: "Daily Streak",
    value: "0",
    icon: "/fire.png",
  },
];

function UserStatus() {
  const { user } = useUser();

  return (
    <div>
      {/* User Info Row */}
      <div className="flex items-center gap-3 mb-5">
        <Image
          src="/alex_walk.gif"
          alt="character"
          width={60}
          height={60}
          className="w-[60px] h-[60px] object-contain"
          unoptimized
        />
        <h3 className="font-game text-lg truncate">
          {user?.primaryEmailAddress?.emailAddress || "user@learncode.dev"}
        </h3>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-3 p-4 border-4 border-zinc-700 rounded-2xl"
          >
            <Image
              src={stat.icon}
              alt={stat.label}
              width={32}
              height={32}
              className="w-[32px] h-[32px] object-contain"
            />
            <div>
              <p className="text-xl font-bold font-game">{stat.value}</p>
              <p className="text-gray-400 text-xs">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserStatus;
