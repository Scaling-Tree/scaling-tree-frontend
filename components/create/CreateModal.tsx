import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { MdOutlineAddCircle } from "react-icons/md";
import CreateModeSelector from "./CreateModeSelector";
import NewNFT from "./NewNFT";
import ImportNFT from "./ImportNFT";

export default function CreateModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [createMode, setCreateMode] = useState<"select" | "import" | "new">(
    "select"
  );

  return (
    <>
      <MdOutlineAddCircle
        onClick={() => setIsOpen(true)}
        className="text-green-400 w-14 h-14 hover:text-green-500 cursor-pointer"
      />
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="mx-auto rounded-xl bg-white w-[450px]">
            {createMode === "select" ? (
              <CreateModeSelector
                setCreateMode={setCreateMode}
                closeModal={() => setIsOpen(false)}
              />
            ) : createMode === "import" ? (
              <ImportNFT
                setCreateMode={setCreateMode}
                closeModal={() => setIsOpen(false)}
              />
            ) : (
              <NewNFT
                setCreateMode={setCreateMode}
                closeModal={() => setIsOpen(false)}
              />
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
