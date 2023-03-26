import {
  HomeQueryDocument,
  FeedQueryDocument,
  Owner,
  Auditor,
  Tree,
  Report,
} from "@/.graphclient";
import ConnectWalletBanner from "@/components/ConnectWalletBanner";
import FeedCard from "@/components/FeedCard";
import WorldMilestone from "@/components/WorldMilestone";
import { config } from "@/config";
import React, { useState } from "react";
import { useQuery } from "urql";

export default function HomeView() {
  const [page, setPage] = useState(0);
  const [isAudit, setIsAudit] = useState(true);

  const skip = page * config.pageSize;

  const [result, reexecuteQuery] = useQuery({
    query: FeedQueryDocument,
    variables: {
      first: config.pageSize,
      skip,
      minReports: isAudit ? 1 : 0
    },
  });

  const { data, fetching, error } = result;

  const totalTrees = data?.app?.totalTrees || 0;
  const auditedTrees = data?.app?.auditedTrees || 0;
  const currentMilestone = isAudit ? auditedTrees : totalTrees;

  return (
    <div className="max-w-[1000px] mx-auto">
      <ConnectWalletBanner />
      <WorldMilestone
        title="World Milestone"
        isAudit={isAudit}
        onChange={(value) => setIsAudit(value)}
        currentMilestone={currentMilestone}
      />
      {data &&
        data.feeds
          .filter((feed) => feed.tree)
          .map(
            (feed) =>
              feed.tree && (
                <div key={feed.id}>
                  <FeedCard
                    type={feed.type}
                    owner={feed.owner as Owner}
                    auditor={feed.auditor as Auditor}
                    from={feed.from as Owner}
                    to={feed.to as Owner}
                    tree={feed.tree as Tree}
                    report={feed.report as Report}
                    timestamp={feed.timestamp}
                  />
                </div>
              )
          )}
      <div className="mt-5" />
    </div>
  );
}
