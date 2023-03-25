import ConnectWalletBanner from "@/components/ConnectWalletBanner";
import WorldMilestone from "@/components/WorldMilestone";
import React from "react";

export default function HomeView() {
  return (
    <div className="max-w-[1000px] mx-auto">
      <ConnectWalletBanner />
      <WorldMilestone />
    </div>
  );
}
