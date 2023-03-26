import React from "react";
import { MdCancel, MdArrowBack } from "react-icons/md";
import MainButton from "../MainButton";

export default function ImportNFT({
  setCreateMode,
  closeModal,
}: {
  setCreateMode: (mode: "select") => void;
  closeModal: () => void;
}) {
  return (
    <form className="w-full h-full ">
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
      <div className="p-5 space-y-3 pt-3">
        <div className="space-y-0.5">
          <label htmlFor="addr" className="text-gray-600 text-sm font-medium">
            NFT Address
          </label>
          <input
            disabled
            id="addr"
            type="text"
            name="address"
            className="w-full border-2 border-gray-300 rounded p-2 text-gray-600 font-medium"
            placeholder="What is your NFT contract addresss ?"
          />
        </div>
        <div className="space-y-0.5">
          <label
            htmlFor="tokenid"
            className="text-gray-600 text-sm font-medium"
          >
            Token ID
          </label>
          <input
            disabled
            id="tokenid"
            type="number"
            name="tokenid"
            className="w-full border-2 border-gray-300 rounded p-2 text-gray-600 font-medium"
            placeholder="What is your NFT token ID ?"
          />
        </div>
        <div className="space-y-0.5">
          <label
            htmlFor="treeNum"
            className="text-gray-600 text-sm font-medium"
          >
            Tree Amount
          </label>
          <input
            disabled
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
          <MainButton text="Post" disabled={true} />
        </div>
      </div>
    </form>
  );
}
