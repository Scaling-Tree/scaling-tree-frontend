import React, { ChangeEvent, useState } from "react";
import { MdCancel, MdArrowBack } from "react-icons/md";
import MainButton from "../MainButton";
import { nftStorageUpload } from "../../utils/nftStorageUpload";
import { useSigner } from "wagmi";
import treeControllerService from "../../services/TreeController.service";
import { toast } from "react-toastify";

export default function NewNFT({
  setCreateMode,
  closeModal,
}: {
  setCreateMode: (mode: "select") => void;
  closeModal: () => void;
}) {
  const [file, setFile] = useState<File>();
  const [treeNum, setTreeNum] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const { data: signer } = useSigner();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handlePost = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    if (file && treeNum) {
      try {
        const uri = await nftStorageUpload(file);
        const tx = await treeControllerService.mintNFT(
          signer,
          +treeNum,
          uri.ipnft
        );
        await tx.wait();
        setFile(undefined);
        setTreeNum("");
        closeModal();
        setCreateMode("select");
        toast.success("🌳 Tree NFT Minted", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (err) {
        console.log(err);
      }
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handlePost} className="w-full h-full ">
      <div className="w-full h-full p-5 flex flex-col pb-3">
        <div className="flex justify-between">
          <div>
            <p className="font-bold text-gray-800">Plant Detail</p>
            <p className="text-gray-400">
              Create your plant in less than 3 minutes
            </p>
          </div>
          <MdCancel
            onClick={closeModal}
            className="h-8 w-8 text-gray-400 hover:text-gray-500 cursor-pointer"
          />
        </div>
      </div>
      <hr />
      <div className="p-5 space-y-3">
        <div className="relative border-dashed border-2 border-gray-400 bg-gray-100 py-20 rounded-lg">
          <input
            required
            onChange={handleFileChange}
            type="file"
            className="absolute inset-0 z-50 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
            <p className="text-gray-400">
              {file
                ? `${file.name}`
                : `Drop your Tree picture here or click to browse`}
            </p>
          </div>
        </div>
        <div className="space-y-0.5">
          <label
            htmlFor="treeNum"
            className="text-gray-600 text-sm font-medium"
          >
            Tree Amount
          </label>
          <input
            required
            value={treeNum}
            onChange={(e) => setTreeNum(e.target.value)}
            id="treeNum"
            type="number"
            name="treeNum"
            className="w-full border-2 border-gray-300 rounded p-2 text-gray-600 font-medium"
            placeholder="How many tree did you plant ?"
          />
        </div>
      </div>
      <hr />
      <div className="px-5 py-3 flex items-center">
        <MdArrowBack
          className="text-gray-400 w-7 h-7 cursor-pointer hover:text-gray-500"
          onClick={() => setCreateMode("select")}
        />
        <div className="w-24 ml-auto">
          <MainButton isLoading={loading} text="Post" type="submit" />
        </div>
      </div>
    </form>
  );
}
