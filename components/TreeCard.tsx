import React from "react";
import { HiBadgeCheck } from "react-icons/hi";
import { SiGumtree } from "react-icons/si";

export default function TreeCard() {
  return (
    <div className="bg-white w-full mt-5 rounded-lg shadow">
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gray-300 rounded-full" />
          <div className="ml-3">
            <p className="font-bold text-gray-800">warunsinx</p>
            <p className="text-sm text-gray-500">Phuket, Thailand</p>
          </div>
        </div>
        <div className="flex items-center text-gray-500">
          <HiBadgeCheck className="text-green-400 mr-1 w-7 h-7" />
          <p>Mar 03, 2023</p>
        </div>
      </div>
      <div className="w-full h-[300px] bg-gray-300" />
      <div className="flex items-center justify-between p-5">
        <p>
          <span className="font-bold">warunsinx</span> Let&apos;s save pur
          planet with tree !
        </p>
        <div className="p-1 px-2 flex bg-green-400 text-white rounded-lg items-center justify-center">
          <p className="text-white mr-1">23</p>
          <SiGumtree />
        </div>
      </div>
    </div>
  );
}
