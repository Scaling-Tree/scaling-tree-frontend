import RankCard from "@/components/RankCard";
import React from "react";
import WorldMilestone from "../components/WorldMilestone";

export default function LeaderboardView() {
  return (
    <div className="max-w-[1000px] mx-auto">
      <WorldMilestone title="Leaderboard" />
      <div className="mt-5">
        <RankCard />
      </div>
    </div>
  );
}
