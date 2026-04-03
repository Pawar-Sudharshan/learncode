import React from "react";
import Image from "next/image";

const exploreOptions = [
  {
    title: "Community",
    description: "Connect with other learners and share your journey.",
    icon: "/tree.png",
  },
  {
    title: "Projects",
    description: "Build real-world projects and strengthen your skills.",
    icon: "/game.png",
  },
  {
    title: "Growth",
    description: "Track your progress and grow your expertise.",
    icon: "/growth.png",
  },
  {
    title: "Explore Apps",
    description: "Discover apps built by the community.",
    icon: "/start-up.png",
  },
];

function ExploreMore() {
  return (
    <div>
      <h2 className="font-game text-2xl mb-4">Explore More</h2>
      <div className="grid grid-cols-2 gap-4">
        {exploreOptions.map((option) => (
          <div
            key={option.title}
            className="flex items-start gap-3 bg-zinc-900 p-4 rounded-xl border border-zinc-700 hover:border-yellow-400/50 transition-colors cursor-pointer"
          >
            <Image
              src={option.icon}
              alt={option.title}
              width={40}
              height={40}
              className="w-[40px] h-[40px] object-contain mt-1"
            />
            <div>
              <h3 className="font-game text-lg">{option.title}</h3>
              <p className="text-gray-400 text-xs">{option.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExploreMore;
