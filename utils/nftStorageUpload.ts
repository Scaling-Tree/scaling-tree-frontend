import { NFTStorage, File } from "nft.storage";

export const nftStorageUpload = async (file: File) => {
  const NFT_STORAGE_KEY = process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY || "";
  const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });
  return nftstorage.store({
    image: file,
    name: "Tree NFT",
    description: "A tree stored in Scaling Tree",
  });
};
