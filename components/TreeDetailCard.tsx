import { Auditor, Owner, Tree, NFT, Report } from "@/.graphclient";
import { formatDate } from "@/utils/format";
import React, { useEffect, useState } from "react";
import { HiBadgeCheck } from "react-icons/hi";
import { SiGumtree } from "react-icons/si";
import axios from "axios";
import Spinner from "./Spinner";

const DEFAULT_IMG_URL = `/images/3-trees.webp`;
const DEFAULT_AVATAR = `/images/bored-ape.jpeg`;

type NFTMetadata = {
  name: string;
  description: string;
  image: string;
};

type PropsType = {
  tree: Tree;
  isLoading?: boolean;
  onAudit?: (id: string) => void;
};

export default function TreeDetailCard(props: PropsType) {
  const { tree, isLoading, onAudit } = props;

  const [imageUrl, setImageUrl] = useState<string | null>(null);

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

  const getEtherscanLink = () => {
    return `https://goerli.etherscan.io/tx/${tree.createdTxHash}`;
  };

  const setFallbackImage = () => {
    setImageUrl(DEFAULT_IMG_URL);
  };

  useEffect(() => {
    getImageUrl();
  }, [tree]);

  const owner = tree.owner;
  const createdAt = tree.createdAt;
  const reports = tree.reports;
  const isAudit = tree.reportCount > 0;

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
            <p className="font-bold text-gray-800">{owner.id}</p>
            <p className="text-sm text-gray-500">
              {formatDate(new Date(createdAt * 1000))}
            </p>
          </div>
        </div>
        {tree.reportCount > 0 && (
          <div className="flex items-center text-gray-500">
            <HiBadgeCheck className="text-green-400 mr-1 w-7 h-7" />
            <p>
              {reports.length > 0 &&
                formatDate(new Date(reports[0].timestamp * 1000))}
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
        <p className="flex items-center space-x-2">
          {onAudit && (
            <button
              className={`p-2 px-2 flex text-white rounded-lg items-center justify-center font-bold  bg-green-40`}
              onClick={() => onAudit(tree.id)}
              disabled={!onAudit || isLoading}
            >
              {isLoading ? (
                <Spinner />
              ) : (
                <p className="text-white mr-1">Audit</p>
              )}
            </button>
          )}
          <a
            href={getEtherscanLink()}
            className="font-bold text-blue-400"
            target="_blank"
          >
            View on etherscan
          </a>
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
