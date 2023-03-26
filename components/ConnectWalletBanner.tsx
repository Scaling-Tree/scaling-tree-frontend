import Image from "next/image";
import React from "react";
import { useAccount } from "wagmi";

export default function ConnectWalletBanner() {
  const { address } = useAccount();

  return (
    <div
      className={`bg-white shadow-sm w-full mt-5 rounded-xl flex items-center p-7 px-10 ${
        address ? "hidden" : "block"
      }`}
    >
      <Image
        src="/images/icon_no_login.png"
        alt="icon_no_login"
        width={120}
        height={0}
      />
      <div className="ml-10">
        <p className="text-gray-400 text-xl">Help planet please !</p>
        <p className="text-gray-900 font-medium text-xl">
          You are not ready to save the planet, Please connect your wallet.
        </p>
      </div>
    </div>
  );
}
