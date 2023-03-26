import getDb from "@/utils/getDb";
import { Polybase } from "@polybase/client";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useAccount, useSigner } from "wagmi";

export interface Profile {
  name: string;
  profileImgUrl: string;
}

export function useProfile() {
  const { data: signer, isError, isLoading: isLoadingUseSigner } = useSigner();
  const [profile, setProfile] = useState<Profile>({
    name: "",
    profileImgUrl: "",
  });
  const { address, connector, isConnected } = useAccount();
  useEffect(() => {
    (async () => {
      if (address) {
        const db = getDb();
        const collectionReference = db.collection("User");
        const { data, block } = await collectionReference
          .record(address.toLocaleLowerCase())
          .get();
        console.log({ x: data });
        let profileToSet = { ...profile };
        if (data?.name) {
          profileToSet.name = data.name;
        }
        if (data?.profileImgUrl) {
          profileToSet.profileImgUrl = data.profileImgUrl;
        }
        setProfile(profileToSet);
      }
    })();
  }, [address]);

  useEffect(() => {
    (async () => {
      if (address) {
        try {
          const db = getDb();
          const user = await db
            .collection("User")
            .record(address.toLowerCase())
            .get();
        } catch (e) {
          const db = getDb();
          if (signer) {
            db.signer(async (data: string) => {
              return {
                h: "eth-personal-sign",
                sig: await signer.signMessage(data),
              };
            });
            await db.collection("User").create([address.toLowerCase()]);
            console.log("user created");
          }
        }
      }
    })();
  }, [address, signer]);

  // useEffect(() => {
  //   (async () => {
  //     if (profile?.publicKey) {
  //       const collectionReference = db.collection("User");
  //       const { data, block } = await collectionReference
  //         .record(profile.publicKey)
  //         .get();
  //       let profileToSet = { ...profile };
  //       if (data?.name) {
  //         profileToSet.name = data.name;
  //       }
  //       if (data?.profileImgUrl) {
  //         profileToSet.profileImgUrl = data.profileImgUrl;
  //       }
  //       setProfile(profileToSet);
  //     }
  //   })();
  // }, [profile?.publicKey]);

  return { profile, setProfile };
}
