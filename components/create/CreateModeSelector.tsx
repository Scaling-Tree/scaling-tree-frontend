import React from "react";
import { MdCancel, MdAdd, MdOutlineFileDownload } from "react-icons/md";

export default function CreateModeSelector({
  setCreateMode,
  closeModal,
}: {
  setCreateMode: (mode: "import" | "new") => void;
  closeModal: () => void;
}) {
  return (
    <div>
      <div className="w-full h-full p-5 flex flex-col pb-3">
        <div className="flex justify-between">
          <div>
            <p className="font-bold text-gray-800">Post your new Tree</p>
            <p className="text-gray-400">How would you like to start ?</p>
          </div>
          <MdCancel
            onClick={closeModal}
            className="h-8 w-8 text-gray-400 hover:text-gray-500 cursor-pointer"
          />
        </div>
      </div>
      <hr />
      <div className="w-full h-full p-5 flex flex-col">
        <div className="flex flex-col items-center justify-center space-y-5">
          <div
            onClick={() => setCreateMode("import")}
            className="w-full h-48 rounded-lg border border-gray-300 bg-white hover:opacity-70 cursor-pointer flex justify-center items-center transition-all duration-300 flex-col"
          >
            <MdOutlineFileDownload className="text-green-400 w-14 h-14" />
            <div className="text-center">
              <p className="font-bold text-gray-600 select-none text-xl">
                I already have a NFT
              </p>
              <p className="text-gray-400 text-sm">Import your exisiting NFT</p>
            </div>
          </div>
          <div
            onClick={() => setCreateMode("new")}
            className="w-full h-48 rounded-lg border border-gray-300 bg-white hover:opacity-70 cursor-pointer flex justify-center items-center transition-all duration-300 flex-col"
          >
            <MdAdd className="text-green-400 w-14 h-14" />
            <div className="text-center">
              <p className="font-bold text-gray-600 select-none text-xl">
                I want to create a new NFT
              </p>
              <p className="text-gray-400 text-sm">Create your new NFT</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
