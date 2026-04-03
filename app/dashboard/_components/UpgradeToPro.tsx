import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function UpgradeToPro() {
  return (
    <div className="flex flex-col items-center p-5 border-4 border-zinc-700 rounded-2xl mt-8">
      <Image
        src="/logo.png"
        alt="LearnCode Pro"
        width={60}
        height={60}
        className="w-[60px] h-[60px] object-contain"
      />
      <h2 className="font-game text-2xl mt-3">Upgrade to Pro</h2>
      <p className="text-gray-400 text-sm text-center mt-2">
        Join pro membership and get all course access.
      </p>
      <Link href="/pricing" className="mt-4">
        <Button variant="pixel" className="font-game text-lg">
          Upgrade Now
        </Button>
      </Link>
    </div>
  );
}

export default UpgradeToPro;
