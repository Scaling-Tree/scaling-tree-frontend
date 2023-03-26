import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useSigner,
} from "wagmi";
import { Polybase } from "@polybase/client";
import { useEffect } from "react";
import {
  ethPersonalSign,
  ethPersonalSignRecoverPublicKey,
} from "@polybase/eth";
import React, { useState } from "react";
import { useSignMessage } from "wagmi";
import { verifyMessage } from "ethers/lib/utils";
import { useIsMounted } from "@/hooks";
import { Dialog, Transition } from "@headlessui/react";
import { ethers } from "ethers";
import ProfileBanner from "@/components/profile/ProfileBanner";
import PersonalMilestone from "@/components/profile/PersonalMilestone";
import TreeCard from "@/components/TreeCard";
import { config } from "@/config";
import { useQuery } from "urql";
import { ProfileQueryDocument } from "@/.graphclient";

export default function ProfileView() {
  const { address, connector, isConnected } = useAccount();

  const [page, setPage] = useState(0);
  const [isAudit, setIsAudit] = useState(true);

  const skip = page * config.pageSize;

  const [result, reexecuteQuery] = useQuery({
    query: ProfileQueryDocument,
    variables: {
      id: address,
      first: config.pageSize,
      skip,
    },
  });

  const { data, fetching, error } = result;

  const totalTrees = data?.app?.totalTrees || 0;
  const auditedTrees = data?.app?.auditedTrees || 0;
  const currentMilestone = isAudit ? auditedTrees : totalTrees;

  console.log(data);

  return (
    <div className="max-w-[1000px] mx-auto">
      <ProfileBanner />
      <PersonalMilestone
        isAudit={isAudit}
        onChange={(value) => setIsAudit(value)}
        currentMilestone={currentMilestone}
      />
      {/* <TreeCard /> */}
      <div className="mt-5" />
    </div>
  );
}
