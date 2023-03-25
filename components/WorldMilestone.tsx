import React, { useState } from "react";
import Progressbar from "./Progressbar";
import {
  HiClipboardDocumentCheck,
  HiClipboardDocumentList,
} from "react-icons/hi2";

export default function WorldMilestone() {
  const [isAudit, setIsAudit] = useState(true);

  return (
    <div className="bg-white shadow-sm w-full mt-5 rounded-xl flex flex-col p-7 px-10">
      <div className="mb-7 flex items-center justify-between">
        <div>
          <p className="font-bold text-2xl">World Milestone</p>
          <p className="text-gray-400">Have you planted a tree today ?</p>
        </div>
        <div className="bg-gray-100 rounded-lg flex items-center justify-center p-1 space-x-3">
          <div
            onClick={() => setIsAudit(true)}
            className={`flex items-center p-2 px-3 rounded-lg cursor-pointer hover:opacity-90 ${
              isAudit ? "text-gray-600 bg-white" : "text-gray-600 bg-gray-100"
            }`}
          >
            <HiClipboardDocumentCheck />
            <p className="ml-1 font-medium">Audited</p>
          </div>
          <div
            onClick={() => setIsAudit(false)}
            className={`flex items-center p-2 px-3 rounded-lg cursor-pointer hover:opacity-90 ${
              !isAudit ? "text-gray-600 bg-white" : "text-gray-600 bg-gray-100"
            }`}
          >
            <HiClipboardDocumentList />
            <p className="ml-1 font-medium">Unaudited</p>
          </div>
        </div>
      </div>
      <Progressbar percent={35} />
      <div className="flex items-center justify-between mt-2">
        <p className="text-green-400 font-bold text-xl">2.39 Trillion</p>
        <p className="font-medium text-xl text-gray-400">
          3.61 Trillion more to{" "}
          <span className="text-green-400">6 Trillion</span>
        </p>
      </div>
    </div>
  );
}
