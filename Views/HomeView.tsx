import ConnectWalletBanner from "@/components/ConnectWalletBanner";
import TreeCard from "@/components/TreeCard";
import WorldMilestone from "@/components/WorldMilestone";
import React from "react";

export default function HomeView() {
  return (
    <div className="max-w-[1000px] mx-auto">
      <ConnectWalletBanner />
      <WorldMilestone title="World Milestone" />
      <TreeCard />
      <div className="mt-5" />
    </div>
  );
}
