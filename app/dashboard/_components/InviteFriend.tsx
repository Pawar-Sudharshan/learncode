import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function InviteFriend() {
  return (
    <div className="flex flex-col items-center p-4 border border-zinc-700 rounded-xl">
      <Image
        src="/mail.png"
        alt="mail"
        width={80}
        height={80}
        className="w-[80px] h-[80px] object-contain"
      />
      <h2 className="font-game text-2xl mt-3">Invite Friend</h2>
      <p className="text-gray-400 text-sm text-center mt-2 max-w-xs">
        Having fun? Share the love. Enter an email and we will send a personal
        invite.
      </p>
      <div className="flex items-center gap-3 mt-4 w-full max-w-sm">
        <Input placeholder="Invite email" className="flex-1" />
        <Button variant="pixel" className="font-game text-lg">
          Invite
        </Button>
      </div>
    </div>
  );
}

export default InviteFriend;
