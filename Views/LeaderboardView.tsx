import { LeaderboardQueryDocument } from "@/.graphclient";
import RankCard from "@/components/RankCard";
import React, { useState } from "react";
import { useQuery } from "urql";
import { config } from "@/config";
import LeaderboardMilestone from "../components/LeaderboardMilestone";

export default function LeaderboardView() {
  const [page, setPage] = useState(0);
  const [isAudit, setIsAudit] = useState(true);

  const skip = page * config.pageSize;

  const [result, reexecuteQuery] = useQuery({
    query: LeaderboardQueryDocument,
    variables: {
      first: config.pageSize,
      skip,
      minAudited: isAudit ? 1 : 0,
    },
  });

  const { data, fetching, error } = result;

  const totalTrees = data?.app?.totalTrees || 0;
  const auditedTrees = data?.app?.auditedTrees || 0;
  const currentMilestone = isAudit ? auditedTrees : totalTrees;

  return (
    <div className="max-w-[1000px] mx-auto">
      <LeaderboardMilestone
        title="Leaderboard"
        isAudit={isAudit}
        onChange={(value) => setIsAudit(value)}
        currentMilestone={currentMilestone}
      />

      <div className="mt-5">
        {data &&
          data.owners.map((owner, i) => {
            const numTree = isAudit ? owner.auditedTrees : owner.totalTrees;
            return (
              <RankCard
                key={i}
                address={owner.id}
                rank={i + 1}
                amount={numTree}
              />
            );
          })}
      </div>
    </div>
  );
}
