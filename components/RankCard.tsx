import Image from "next/image";
import React from "react";
import { useProfileWithAddr } from "../hooks/useProfileWithAddr";

export default function RankCard({
  address,
  rank,
  amount,
}: {
  address: string;
  rank: number;
  amount: number;
}) {
  const { profile, setProfile } = useProfileWithAddr(address);

  return (
    <div className="w-full bg-white shadow mt-3 rounded-lg p-6 px-10 flex items-center">
      <div className="relative w-[70px] h-[70px]">
        <Image
          className="rounded-lg absolute"
          src={profile.profileImgUrl || "/images/icon_no_login.png"}
          alt="logo"
          layout="fill"
          objectFit="cover"
        />
        <div className="w-7 h-7 bg-green-400 rounded-full absolute -top-2 -left-2 flex items-center justify-center text-white font-medium text-sm">
          {rank}
        </div>
      </div>
      <div className="ml-5">
        <p className="font-medium text-lg text-gray-800">
          {profile.name || address}
        </p>
        <p className="text-gray-400">{address}</p>
      </div>
      <div className="flex items-center ml-auto">
        <div className="w-5 h-5 bg-green-700 rounded-full" />
        <p className="ml-2 text-gray-400 text-lg">{amount}</p>
      </div>
    </div>
  );
}
