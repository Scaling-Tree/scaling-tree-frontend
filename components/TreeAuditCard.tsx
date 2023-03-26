import { Auditor, Owner, Tree, NFT, Report } from "@/.graphclient";
import { formatDate } from "@/utils/format";
import React, { useEffect, useState } from "react";
import { HiBadgeCheck } from "react-icons/hi";
import { SiGumtree } from "react-icons/si";
import axios from "axios";

const DEFAULT_IMG_URL = `/images/3-trees.webp`;
const DEFAULT_AVATAR = `/images/bored-ape.jpeg`;

type PropsType = {
  report: Report;
};

export default function TreeAuditCard(props: PropsType) {
  const { report } = props;

  const auditor = report.auditor;
  const timestamp = report.timestamp;
  const treeNumber = report.treeNumber;

  return (
    <div className="bg-white w-full mt-5 rounded-lg shadow">
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gray-300 rounded-full">
            <img
              src={DEFAULT_AVATAR}
              alt="avatar"
              className="w-12 h-12 rounded-full"
            />
          </div>
          <div className="ml-3">
            <p className="font-bold text-gray-800">{auditor.id}</p>
            {/* <p className="text-sm text-gray-500">
              {formatDate(new Date(timestamp * 1000))}
            </p> */}
          </div>
        </div>
        <div className="flex items-center text-gray-500">
          <HiBadgeCheck className="text-green-400 mr-1 w-7 h-7" />
          <p className="mr-3">{formatDate(new Date(report.timestamp * 1000))}</p>
          <div
            className={`p-1 px-2 flex text-white rounded-lg items-center justify-center  bg-green-400`}
          >
            <p className="text-white mr-1">{treeNumber}</p>
            <SiGumtree />
          </div>
        </div>
      </div>
      {/* <div className="w-full bg-gray-300">
        {imageUrl && (
          <img
            src={imageUrl}
            onError={() => setFallbackImage()}
            alt="NFT image"
            className="w-full"
          />
        )}
      </div> */}
      {/* <div className="flex items-center justify-between p-5">
        <p>
          <span className="font-bold">{auditor.id}</span> audited trees
        </p>
        <div
          className={`p-1 px-2 flex text-white rounded-lg items-center justify-center  bg-green-400`}
        >
          <p className="text-white mr-1">{treeNumber}</p>
          <SiGumtree />
        </div>
      </div> */}
    </div>
  );
}
