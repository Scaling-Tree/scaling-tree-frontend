import { TreeQueryDocument } from "@/.graphclient";
import ConnectWalletBanner from "@/components/ConnectWalletBanner";
import TreeCard from "@/components/TreeCard";
import WorldMilestone from "@/components/WorldMilestone";
import React from "react";
import { useQuery } from "urql";

export default function HomeView() {
  const [result, reexecuteQuery] = useQuery({ query: TreeQueryDocument });

  const { data, fetching, error } = result;

  return (
    <div className="max-w-[1000px] mx-auto">
      <ConnectWalletBanner />
      <WorldMilestone title="World Milestone" />
      {data &&
        data.trees.map((tree) => (
          <div key={tree.id}>
            <TreeCard
              owner={{ address: tree.owner.id, name: tree.owner.id }}
              operator={{ address: tree.owner.id, name: tree.owner.id }}
              updatedAt={new Date(tree.updatedAt)}
              treeNumber={tree.treeNumber}
              reports={[]}
              message={`Mint an NFT`}
            />
          </div>
        ))}
      <div className="mt-5" />
    </div>
  );
}
