"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy, Medal } from "lucide-react";

interface LeaderboardUser {
  id: number;
  name: string;
  points: number;
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch the top users on mount
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/leaderboard');
        setLeaderboard(response.data);
      } catch (error) {
        console.error("Error fetching platform rankings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
       <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 space-y-4">
         <Skeleton className="h-4 w-32 bg-zinc-800" />
         <div className="space-y-3">
           {[...Array(6)].map((_, i) => (
             <Skeleton key={i} className="h-14 w-full rounded-xl bg-zinc-800" />
           ))}
         </div>
       </div>
    );
  }

  // Dynamic ranking styles for gold, silver, and bronze trophies
  const getRankStyle = (index: number) => {
    switch (index) {
      case 0: return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
      case 1: return "text-zinc-300 bg-zinc-300/10 border-zinc-300/20 shadow-[0_0_15px_rgba(255,255,255,0.05)]";
      case 2: return "text-orange-500 bg-orange-500/10 border-orange-500/20";
      default: return "text-zinc-600 bg-zinc-900/50 border-zinc-800";
    }
  };

  return (
    <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 space-y-6 shadow-2xl">
      <div className="flex justify-between items-center">
         <h2 className="font-game text-xs text-zinc-500 uppercase tracking-[0.2em]">Global Rankings</h2>
         <span className="text-[9px] font-mono text-zinc-700 font-bold uppercase tracking-tighter underline underline-offset-4 decoration-zinc-800">Top Engineers</span>
      </div>

      <div className="space-y-2.5">
        {leaderboard.map((user, index) => (
          <div 
            key={user.id} 
            className="flex items-center justify-between bg-zinc-950 p-3.5 rounded-xl border border-zinc-900 group hover:border-zinc-800 transition-all duration-300 hover:translate-x-1 shadow-inner"
          >
            <div className="flex items-center gap-4">
               {/* Numerical Rank Badge */}
               <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black border ${getRankStyle(index)}`}>
                  {index + 1}
               </div>
               
               <Avatar className="w-9 h-9 border border-zinc-900 ring-2 ring-zinc-900/50">
                  <AvatarFallback className="bg-zinc-900 text-zinc-500 text-[10px] font-black uppercase tracking-tighter">
                     {user.name?.substring(0, 2)}
                  </AvatarFallback>
               </Avatar>

               <div className="flex flex-col">
                 <p className="text-xs font-game text-zinc-400 group-hover:text-white transition-colors tracking-tight">{user.name}</p>
                 <div className="flex items-center gap-1.5">
                    {index === 0 && <Trophy className="w-2.5 h-2.5 text-yellow-600" />}
                    {index > 0 && index < 3 && <Medal className="w-2.5 h-2.5 text-zinc-500" />}
                    <span className="text-[8px] font-mono text-zinc-700 uppercase font-black">Verified Learner</span>
                 </div>
               </div>
            </div>

            <div className="text-right">
               <div className="text-[13px] font-mono font-black text-white tracking-widest">{user.points}</div>
               <div className="text-[8px] font-game text-zinc-800 uppercase tracking-widest leading-none">Total XP</div>
            </div>
          </div>
        ))}

        {leaderboard.length === 0 && (
           <div className="text-center py-6 text-zinc-800 font-game text-[10px] uppercase tracking-widest border border-dashed border-zinc-900 rounded-xl">
             Awaiting Leaders...
           </div>
        )}
      </div>
    </div>
  );
}
