import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useSigner,
} from "wagmi";
import { Polybase } from "@polybase/client";
import { useEffect } from "react";
import {
  ethPersonalSign,
  ethPersonalSignRecoverPublicKey,
} from "@polybase/eth";
import * as React from "react";
import { useSignMessage } from "wagmi";
import { verifyMessage } from "ethers/lib/utils";
import { useIsMounted } from "@/hooks";
import { Dialog, Transition } from "@headlessui/react";
import { ethers } from "ethers";

export default function Profile() {
  const { address, connector, isConnected } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ address });
  const { data: ensName } = useEnsName({ address });
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();
  const db = new Polybase({
    defaultNamespace:
      "pk/0xd51f360fa2f5ae76cdde0c5df29ec486efefb1d6aed136eb88837aeda8810baa1fa869f3f2b4ef567930e4f1072764494aaccc275e3acc3456cb87ee3bf56895/scaling-tree2",
  });
  const isMounted = useIsMounted();
  let [isOpen, setIsOpen] = React.useState(false);
  const [publicKey, setPublicKey] = React.useState("");
  const { data: signer, isError, isLoading: isLoadingUseSigner } = useSigner();
  const [username, setUsername] = React.useState("");

  useEffect(() => {
    let publicKey = localStorage.getItem("publicKey");
    if (publicKey) {
      setPublicKey(publicKey);
      return;
    }
  }, []);

  const getName = async () => {
    if (publicKey) {
      const collectionReference = db.collection("User");
      const { data, block } = await collectionReference.record(publicKey).get();
      if (data?.name) {
        setUsername(data.name);
      }
    }
  };

  useEffect(() => {
    getName();
  }, [publicKey]);

  if (!isMounted) return null;

  if (isConnected) {
    return (
      <div>
        <Transition appear show={isOpen} as={React.Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => {
              setIsOpen(false);
            }}
          >
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={React.Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    {!publicKey && (
                      <button
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={async () => {
                          if (signer) {
                            (async () => {
                              db.signer(async (data: string) => {
                                return {
                                  h: "eth-personal-sign",
                                  sig: await signer.signMessage(data),
                                };
                              });
                              try {
                                const message = "Hello dapp";
                                const signature = await signer.signMessage(
                                  message
                                );
                                console.log("signature", signature);
                                const pk = ethers.utils.recoverPublicKey(
                                  ethers.utils.arrayify(
                                    ethers.utils.hashMessage(message)
                                  ),
                                  signature
                                );
                                try {
                                  db.signer(async (data: string) => {
                                    return {
                                      h: "eth-personal-sign",
                                      sig: await signer.signMessage(data),
                                    };
                                  });
                                  const user = await db
                                    .collection("User")
                                    .record("0x" + pk.slice(4))
                                    .get();
                                  console.log("User", user);
                                } catch (e) {
                                  console.error("e", e);
                                  if (address) {
                                    await db
                                      .collection("User")
                                      .create([address]);
                                  }
                                }
                                setPublicKey("0x" + pk.slice(4));
                                localStorage.setItem(
                                  "publicKey",
                                  "0x" + pk.slice(4)
                                );
                              } catch (e) {
                                console.error("e", e);
                              }
                            })();
                          }
                        }}
                      >
                        sign message to get public key
                      </button>
                    )}
                    {publicKey && (
                      <>
                        <form className="px-8 pt-6 pb-8 mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Profile
                          </label>
                          <div className="mb-4 mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                              Username
                            </label>
                            <label className="block text-gray-700 text-slate-400 text-sm font-bold mb-2">
                              Create your awesome username
                            </label>
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="username"
                              type="text"
                              placeholder="Username"
                              value={username}
                              onChange={(e) => {
                                setUsername(e.target.value);
                              }}
                            />

                            <button
                              className="mt-3 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                              type="button"
                              onClick={async () => {
                                if (signer) {
                                  db.signer(async (data: string) => {
                                    return {
                                      h: "eth-personal-sign",
                                      sig: await signer.signMessage(data),
                                    };
                                  });
                                  const recordData = await db
                                    .collection("User")
                                    .record(publicKey)
                                    .call("setName", [username]);
                                  setIsOpen(false);
                                }
                              }}
                            >
                              update my profile
                            </button>
                          </div>
                        </form>
                      </>
                    )}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
        <button
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Edit profile
        </button>
      </div>
    );
  }
  return (
    <>
      <ConnectButton />;
    </>
  );
}
