"use client";

import React from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

function WelcomeBanner() {
  const { user } = useUser();

  return (
    <div className="flex items-center gap-6 bg-zinc-800 p-4 rounded-xl rounded-bl-none">
      <Image
        src="/machine.webp"
        alt="machine"
        width={120}
        height={120}
        className="w-[120px] h-[120px] object-contain"
      />
      <div>
        <h2 className="font-game text-3xl">
          Welcome back,{" "}
          <span className="text-yellow-400">
            {user?.fullName || user?.firstName || "Learner"}
          </span>
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Start learning something new
        </p>
      </div>
    </div>
  );
}

export default WelcomeBanner;
