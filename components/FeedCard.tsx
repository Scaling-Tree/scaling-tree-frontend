import { Auditor, Owner, Tree, NFT, Report } from "@/.graphclient";
import { formatDate } from "@/utils/format";
import React, { useEffect, useState } from "react";
import { HiBadgeCheck } from "react-icons/hi";
import { SiGumtree } from "react-icons/si";
import axios from "axios";

const ADDED = "added";
const TRANSFERRED = "transferred";
const WITHDREW = "withdrew";
const AUDITED = "audited";

const DEFAULT_IMG_URL = `/images/3-trees.webp`;
const DEFAULT_AVATAR = `/images/bored-ape.jpeg`;

type NFTMetadata = {
  name: string;
  description: string;
  image: string;
};

type PropsType = {
  type: string;
  owner?: Owner;
  auditor?: Auditor;
  from?: Owner;
  to?: Owner;
  tree?: Tree;
  report?: Report;
  timestamp: number;
};

export default function FeedCard(props: PropsType) {
  const { owner, auditor, from, to, tree, report, timestamp } = props;

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const getActor = () => {
    if (props.type === ADDED && owner) {
      return owner;
    }
    if (props.type === TRANSFERRED && from) {
      return from;
    }
    if (props.type === WITHDREW && owner) {
      return owner;
    }
    if (props.type === AUDITED && auditor) {
      return auditor;
    }
    return owner;
  };

  const getFeedMessage = () => {
    if (props.type === ADDED && owner && tree) {
      const countMsg = tree.treeNumber > 1 ? "trees" : "tree";
      return `added an NFT that contains ${tree.treeNumber} ${countMsg}`;
    }
    if (props.type === TRANSFERRED && from && to && tree) {
      const countMsg = tree.treeNumber > 1 ? "trees" : "tree";
      return `transferred an NFT that contains ${tree.treeNumber} ${countMsg} to ${to.id}`;
    }
    if (props.type === WITHDREW && owner && tree) {
      const countMsg = tree.treeNumber > 1 ? "trees" : "tree";
      return `withdrew an NFT that contains ${tree.treeNumber} ${countMsg}`;
    }
    if (props.type === AUDITED && auditor && report && tree) {
      const isAreMes = report.treeNumber > 1 ? "are" : "is";
      const countMsg = report.treeNumber > 1 ? "trees" : "tree";
      return `audited an NFT of ${tree.owner.id} and reported that there ${isAreMes} ${report.treeNumber} ${countMsg}`;
    }
    return "";
  };

  const getImageUrl = async () => {
    if (tree) {
      try {
        const metadata: NFTMetadata = await axios
          .get(`${tree.nft.tokenUri}/metadata.json`)
          .then((res) => res.data);
        if (metadata.image) {
          setImageUrl(
            metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/")
          );
        }
      } catch (e) {
        setImageUrl(DEFAULT_IMG_URL);
        console.error("Error fetch nft data", e);
      }
    }
  };

  const setFallbackImage = () => {
    setImageUrl(DEFAULT_IMG_URL);
  };

  useEffect(() => {
    getImageUrl();
  }, [tree]);

  const actor = getActor();
  const isAudit = tree?.reportCount > 0;

  return (
    <div className="bg-white w-full mt-5 rounded-lg shadow">
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gray-300 rounded-full">
            <img src={DEFAULT_AVATAR} alt="avatar" className="w-12 h-12 rounded-full"/>
          </div>
          <div className="ml-3">
            <p className="font-bold text-gray-800">{actor?.id}</p>
            <p className="text-sm text-gray-500">
              {formatDate(new Date(timestamp * 1000))}
            </p>
          </div>
        </div>
        {tree && tree.reportCount > 0 && (
          <div className="flex items-center text-gray-500">
            <HiBadgeCheck className="text-green-400 mr-1 w-7 h-7" />
            <p>
              {tree &&
                tree.reports.length > 0 &&
                formatDate(new Date(tree.reports[0].timestamp * 1000))}
            </p>
          </div>
        )}
      </div>
      <div className="w-full bg-gray-300">
        {imageUrl && (
          <img
            src={imageUrl}
            onError={() => setFallbackImage()}
            alt="NFT image"
            className="w-full"
          />
        )}
      </div>
      <div className="flex items-center justify-between p-5">
        <p>
          <span className="font-bold">{actor?.id}</span> {getFeedMessage()}
        </p>
        <div
          className={`p-1 px-2 flex text-white rounded-lg items-center justify-center ${
            isAudit ? "bg-green-400" : "bg-gray-400"
          }`}
        >
          <p className="text-white mr-1">{tree && tree.treeNumber}</p>
          <SiGumtree />
        </div>
      </div>
    </div>
  );
}
