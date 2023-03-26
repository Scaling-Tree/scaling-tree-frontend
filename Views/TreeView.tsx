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

  const renderData = () => {
    if (isLoading) return <div></div>
    if (isLoading || fetching) return <div>Loading . . .</div>;
    if (error) return <div>Something went wrong. Please try again</div>;
    if (data && data.tree) return (
      <div>
        <TreeDetailCard tree={data.tree as Tree} />
      </div>
    )
    return <div>Tree not found</div>;
  };

  return (
    <div className="max-w-[1000px] mx-auto">
      {!isConnected && <ConnectWalletBanner />}
      {renderData()}
      <div className="mt-5" />
    </div>
  );
}
