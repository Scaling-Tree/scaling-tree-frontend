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
import Image from "next/image";

export default function ProfileBanner() {
  const { address, connector, isConnected } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ address });
  const { data: ensName } = useEnsName({ address });
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();
  const db = new Polybase({
    defaultNamespace:
      "pk/0xd51f360fa2f5ae76cdde0c5df29ec486efefb1d6aed136eb88837aeda8810baa1fa869f3f2b4ef567930e4f1072764494aaccc275e3acc3456cb87ee3bf56895/scaling-tree2",
  });
  const isMounted = useIsMounted();
  let [isOpen, setIsOpen] = React.useState(false);
  const [publicKey, setPublicKey] = React.useState("");
  const { data: signer, isError, isLoading: isLoadingUseSigner } = useSigner();
  const [username, setUsername] = React.useState("");

  useEffect(() => {
    let publicKey = localStorage.getItem("publicKey");
    if (publicKey) {
      setPublicKey(publicKey);
      return;
    }
  }, []);

  const getName = async () => {
    if (publicKey) {
      const collectionReference = db.collection("User");
      const { data, block } = await collectionReference.record(publicKey).get();
      if (data?.name) {
        setUsername(data.name);
      }
    }
  };

  useEffect(() => {
    getName();
  }, [publicKey]);

  if (!isMounted) return null;

  if (isConnected) {
    return (
      <div className="bg-white shadow-sm w-full mt-5 rounded-xl flex justify-between items-center p-7 px-10">
        <div className="flex flex-wrap justify-start">
          <div className="w-6/12 sm:w-4/12 px-4">
            <img
              src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg"
              alt="..."
              className="shadow rounded-full max-w-full h-auto align-middle border-none"
            />
          </div>
        </div>
      </div>
    );
  }
  return <></>;
}
