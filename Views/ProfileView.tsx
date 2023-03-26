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
import * as React from "react";
import { useSignMessage } from "wagmi";
import { verifyMessage } from "ethers/lib/utils";
import { useIsMounted } from "@/hooks";
import { Dialog, Transition } from "@headlessui/react";
import { ethers } from "ethers";
import ProfileBanner from "@/components/profile/ProfileBanner";
import PersonalMilestone from "@/components/profile/PersonalMilestone";
import TreeCard from "@/components/TreeCard";

export default function ProfileView() {
  return (
    <div className="max-w-[1000px] mx-auto">
      <ProfileBanner />
      <PersonalMilestone />
      {/* <TreeCard /> */}
      <div className="mt-5" />
    </div>
  );
}
