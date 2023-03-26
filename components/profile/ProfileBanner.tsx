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
import Image from "next/image";
import { useProfile } from "@/hooks/useProfile";
import getDb from "@/utils/getDb";

export default function ProfileBanner() {
  const { address, connector, isConnected } = useAccount();
  const isMounted = useIsMounted();
  const [publicKey, setPublicKey] = React.useState("");
  const { profile, setProfile } = useProfile();
  const [username, setUsername] = React.useState("");
  let [isOpen, setIsOpen] = React.useState(false);
  const { data: signer, isError, isLoading: isLoadingUseSigner } = useSigner();
  const [profileImgFile, setProfileImgFile] = React.useState<File>();
  const [profileImgUrl, setProfileImgUrl] = React.useState<string>();
  const [displayName, setDisplayName] = React.useState<string>();
  const [displayProfileImg, setDisplayProfileImg] = React.useState<string>();
  const [isLoadingUsername, setIsLoadingUsername] = React.useState(true);
  const [isLoadingProfile, setIsLoadingProfile] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  useEffect(() => {
    if (profile?.name && !username) {
      setUsername(profile.name);
      setDisplayName(profile.name);
      return;
    }
    if (!profile?.name) {
      setIsLoadingUsername(false);
    }
  }, [profile, username]);

  useEffect(() => {
    if (profile?.profileImgUrl && !profileImgUrl) {
      setProfileImgUrl(profile.profileImgUrl);
      setDisplayProfileImg(profile.profileImgUrl);
      return;
    }
    if (!profile?.profileImgUrl) {
      setIsLoadingProfile(false);
    }
  }, [profile, profileImgUrl]);

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImgFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImgUrl(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isMounted) return null;

  if (isConnected) {
    return (
      <>
        <div className="bg-white shadow-sm w-full mt-5 rounded-xl flex justify-between items-center p-7 px-10">
          {!isLoadingUsername && !isLoadingProfile && (
            <div className="flex justify-start">
              <div className="px-4">
                <Image
                  className="shadow rounded-full max-w-full h-auto align-middle border-none"
                  src={displayProfileImg || "/images/icon_no_login.png"}
                  alt="logo"
                  height={400}
                  width={200}
                />
              </div>
              <div className="w-full px-4 flex flex-col justify-center">
                <div>
                  <p className="text-xl font-bold leading-normal mb-2 text-gray-800 mb-2">
                    {displayName}
                  </p>
                  <p>
                    <span className="text-sm font-bold leading-normal text-gray-400">
                      {address?.slice(0, 6) + "..." + address?.slice(-4)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
          {!(!isLoadingUsername && !isLoadingProfile) && <div></div>}
          <div>
            <button
              onClick={() => {
                setIsOpen(true);
              }}
              className="bg-green-400 active:bg-gray-100 text-white font-semibold px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            >
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
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
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Profile
                    </Dialog.Title>
                    <p className="text-sm text-gray-500 mt-2">
                      Create your awesome profile
                    </p>
                    <hr className="mt-3" />
                    <div>
                      <form className="mt-4">
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="username"
                          >
                            Username
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
                        </div>
                        <div>
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="username"
                          >
                            Profile image
                          </label>
                          {profileImgUrl && (
                            <div className="flex items-center justify-center w-full mb-3">
                              <label
                                htmlFor="dropzone-file"
                                className="cursor-pointer"
                              >
                                <img
                                  src={profileImgUrl}
                                  alt="profile image"
                                  className="shadow rounded max-w-full h-auto align-middle border-none"
                                />
                                <input
                                  id="dropzone-file"
                                  type="file"
                                  className="hidden"
                                  onChange={handleUploadFile}
                                />
                              </label>
                            </div>
                          )}
                          {!profileImgUrl && (
                            <div className="flex items-center justify-center w-full">
                              <label
                                htmlFor="dropzone-file"
                                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                              >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <svg
                                    aria-hidden="true"
                                    className="w-10 h-10 mb-3 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    />
                                  </svg>
                                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">
                                      Click to upload
                                    </span>{" "}
                                    or drag and drop
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                                  </p>
                                </div>
                                <input
                                  id="dropzone-file"
                                  type="file"
                                  className="hidden"
                                  onChange={handleUploadFile}
                                />
                              </label>
                            </div>
                          )}
                        </div>
                      </form>
                    </div>
                    <hr className="mt-8" />
                    <div className="mt-4 flex justify-end">
                      <div>
                        <button
                          onClick={() => {
                            setIsOpen(false);
                          }}
                          className="active:bg-gray-100 text-balck font-semibold px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        >
                          Cancel
                        </button>
                        <button
                          disabled={isSubmitting}
                          onClick={async () => {
                            setIsSubmitting(true);
                            const db = getDb();
                            if (!signer) return;
                            if (signer) {
                              db.signer(async (data: string) => {
                                return {
                                  h: "eth-personal-sign",
                                  sig: await signer.signMessage(data),
                                };
                              });
                            }
                            if (address && username) {
                              await db
                                .collection("User")
                                .record(address)
                                .call("setName", [username]);
                              setDisplayName(username);
                            }
                            if (address && profileImgFile) {
                              const formData = new FormData();
                              formData.append("file", profileImgFile);
                              const res = await fetch("/api/uploadFile", {
                                method: "POST",
                                body: formData,
                              });
                              const file = await res.json();
                              console.log("file", file);
                              console.log("file.message", file.message);
                              if (file.message) {
                                console.log(file.message, "file.message");

                                await db
                                  .collection("User")
                                  .record(address)
                                  .call("setProfileImgUrl", [file.message]);
                                setDisplayProfileImg(file.message);
                              }
                            }
                            setIsSubmitting(false);
                            setIsOpen(false);
                          }}
                          className="ml-3 bg-green-400 active:bg-gray-100 text-white font-semibold px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        >
                          {isSubmitting ? (
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8z"
                              ></path>
                            </svg>
                          ) : (
                            "Update my profile"
                          )}
                        </button>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
  }
  return <></>;
}
