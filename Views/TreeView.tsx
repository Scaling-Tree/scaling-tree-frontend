import {
  HomeQueryDocument,
  FeedQueryDocument,
  Owner,
  Auditor,
  Tree,
  Report,
  TreeQueryDocument,
} from "@/.graphclient";
import ConnectWalletBanner from "@/components/ConnectWalletBanner";
import FeedCard from "@/components/FeedCard";
import TreeAuditCard from "@/components/TreeAuditCard";
import TreeCard from "@/components/TreeCard";
import TreeDetailCard from "@/components/TreeDetailCard";
import WorldMilestone from "@/components/WorldMilestone";
import { config } from "@/config";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQuery } from "urql";
import { useAccount } from "wagmi";

export default function TreeView() {
  const id = useRouter().query.id as string;

  const [page, setPage] = useState(0);
  const [isAudit, setIsAudit] = useState(true);
  const { address, connector, isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(true);

  const skip = page * config.pageSize;

  const [result, reexecuteQuery] = useQuery({
    query: TreeQueryDocument,
    variables: {
      id,
      skip,
    },
  });

  const { data, fetching, error } = result;

  useEffect(() => {
    setIsLoading(false);
  }, []);

  // TODO: Check auditor
  const isAuditor = false;

  // TODO: Implement it
  const handleAudit = (id: string) => {};

  const renderData = () => {
    if (!isLoading) {
      if (fetching) return <div>Loading . . .</div>;
      if (error) return <div>Something went wrong. Please try again</div>;
      if (data && data.tree)
        return (
          <div>
            {!isConnected && <ConnectWalletBanner />}
            <TreeDetailCard
              tree={data.tree as Tree}
              onAudit={isAuditor ? (id) => handleAudit(id) : undefined}
            />
            <h3 className="mt-6 font-semibold">Audit reports</h3>
            {data.tree.reports.map((report) => (
              <div key={report.id}>
                <TreeAuditCard report={report as Report} />
              </div>
            ))}
          </div>
        );
    } else {
      return <div>Loading . . .</div>;
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto">
      {renderData()}
      <div className="mt-5" />
    </div>
  );
}
