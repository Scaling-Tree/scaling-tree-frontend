import React from "react";

export default function RankCard() {
  return (
    <div className="w-full bg-white shadow mt-3 rounded-lg p-6 px-10 flex items-center">
      <div className="relative">
        <div className="w-20 h-20 bg-gray-300 rounded-lg" />
        <div className="w-7 h-7 bg-green-400 rounded-full absolute -top-2 -left-2 flex items-center justify-center text-white font-medium text-sm">
          1
        </div>
      </div>
      <div className="ml-5">
        <p className="font-medium text-lg text-gray-800">warunsinx</p>
        <p className="text-gray-400">0x1ex0ababab...6Ab8</p>
      </div>
      <div className="flex items-center ml-auto">
        <div className="w-5 h-5 bg-green-700 rounded-full" />
        <p className="ml-2 text-gray-400 text-lg">1.5 Trillion</p>
      </div>
    </div>
  );
}
