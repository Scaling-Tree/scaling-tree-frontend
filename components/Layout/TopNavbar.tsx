import Image from "next/image";
import React from "react";
import ConnectWalletBtn from "../ConnectWalletBtn";

export default function TopNavbar() {
  return (
    <div className="w-full h-20 bg-gray-900">
      <div className="h-full max-w-[1000px] flex items-center justify-between mx-auto">
        <Image
          src="/images/logo_scaling_tree.png"
          alt="logo"
          height={0}
          width={200}
        />
        <ConnectWalletBtn />
      </div>
    </div>
  );
}
