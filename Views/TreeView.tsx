import {
  HomeQueryDocument,
  FeedQueryDocument,
  Owner,
  Auditor,
  Tree,
  Report,
  TreeQueryDocument,
  ProfileQueryDocument,
  AuditorQueryDocument,
} from "@/.graphclient";
import ConnectWalletBanner from "@/components/ConnectWalletBanner";
import FeedCard from "@/components/FeedCard";
import TreeAuditCard from "@/components/TreeAuditCard";
import TreeCard from "@/components/TreeCard";
import TreeDetailCard from "@/components/TreeDetailCard";
import WorldMilestone from "@/components/WorldMilestone";
import { config } from "@/config";
import treeControllerService from "@/services/TreeController.service";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useQuery } from "urql";
import { useAccount, useSigner } from "wagmi";

export default function TreeView() {
  const id = useRouter().query.id as string;

  const [page, setPage] = useState(0);
  const [isAudit, setIsAudit] = useState(true);
  const { address, connector, isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [treeAmount, setTreeAmount] = useState(10);

  const { data: signer } = useSigner();

  const skip = page * config.pageSize;

  const [result, reexecuteQuery] = useQuery({
    query: TreeQueryDocument,
    variables: {
      id,
      skip,
    },
  });

  const [auditorResult] = useQuery({
    query: AuditorQueryDocument,
    variables: {
      id: address,
    },
  });

  const { data, fetching, error } = result;
  const auditor = auditorResult.data?.auditor;

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const isAuditor = auditor !== null;

  const handleAudit = async (id: string) => {
    setIsSending(true);
    try {
      const [nftAddress, tokenId] = id.split("-");
      const tx = await treeControllerService.audit(
        signer,
        nftAddress,
        tokenId,
        treeAmount
      );
      await tx.wait();
      toast.success("🌳 Tree NFT Audited", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      reexecuteQuery();
    } catch (e) {
      console.error(e);
    }
    setIsSending(false);
  };

  const renderData = () => {
    if (!isLoading) {
      if (data && data.tree)
        return (
          <div>
            {!isConnected && <ConnectWalletBanner />}
            <TreeDetailCard
              tree={data.tree as Tree}
              onAudit={isAuditor ? (id) => handleAudit(id) : undefined}
              isLoading={isSending}
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
