import { HomeQueryDocument } from "@/.graphclient";
import ConnectWalletBanner from "@/components/ConnectWalletBanner";
import TreeCard from "@/components/TreeCard";
import WorldMilestone from "@/components/WorldMilestone";
import { config } from "@/config";
import React, { useState } from "react";
import { useQuery } from "urql";

export default function HomeView() {
  const [page, setPage] = useState(0);
  const [isAudit, setIsAudit] = useState(true);

  const skip = page * config.pageSize;

  const [result, reexecuteQuery] = useQuery({
    query: HomeQueryDocument,
    variables: {
      first: config.pageSize,
      skip,
      minReports: isAudit ? 1 : 0,
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
        data.trees.map((tree) => (
          <div key={tree.id}>
            <TreeCard
              owner={{ address: tree.owner.id, name: tree.owner.id }}
              operator={{ address: tree.owner.id, name: tree.owner.id }}
              updatedAt={new Date(tree.updatedAt)}
              treeNumber={tree.treeNumber}
              isAudited={tree.reportCount > 0}
              reports={[]}
              message={`Mint an NFT`}
            />
          </div>
        ))}
      <div className="mt-5" />
    </div>
  );
}
