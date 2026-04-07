"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trophy, Shield, Zap } from "lucide-react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserStatus() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/user/info');
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user info", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
       <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 animate-pulse">
         <Skeleton className="h-20 w-full rounded-xl bg-zinc-800" />
       </div>
    );
  }

  return (
    <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 space-y-6">
      {/* XP Summary */}
      <div className="flex items-center gap-4 bg-zinc-950 p-4 rounded-xl border border-zinc-800 shadow-inner">
        <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center border border-yellow-500/20">
           <Trophy className="text-yellow-500 w-6 h-6" />
        </div>
        <div>
           <div className="text-[10px] font-game text-zinc-500 uppercase tracking-widest">Total XP Earned</div>
           <div className="text-2xl font-mono font-black text-white">{userData?.points || 0}</div>
        </div>
      </div>

      {/* Rank Stats Placeholder */}
      <div className="space-y-3">
         <div className="flex justify-between items-center text-xs">
            <span className="text-zinc-500 font-game uppercase tracking-tighter flex items-center gap-2">
               <Shield className="w-3 h-3 text-blue-500" /> Rank
            </span>
            <span className="text-zinc-300 font-mono">Initiate</span>
         </div>
         <div className="flex justify-between items-center text-xs">
            <span className="text-zinc-500 font-game uppercase tracking-tighter flex items-center gap-2">
               <Zap className="w-3 h-3 text-yellow-500" /> Day Streak
            </span>
            <span className="text-zinc-300 font-mono">1 Day</span>
         </div>
      </div>

      <Button variant="outline" className="w-full border-zinc-800 font-game text-[10px] uppercase tracking-widest hover:bg-zinc-800">
         View Leaderboard
      </Button>
    </div>
  );
}
