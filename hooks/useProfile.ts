import { Polybase } from "@polybase/client";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useSigner } from "wagmi";

export interface Profile {
  name: string;
  profileImgUrl: string;
  publicKey: string;
}

export function useProfile() {
  const db = new Polybase({
    defaultNamespace:
      "pk/0xd51f360fa2f5ae76cdde0c5df29ec486efefb1d6aed136eb88837aeda8810baa1fa869f3f2b4ef567930e4f1072764494aaccc275e3acc3456cb87ee3bf56895/scaling-tree2",
  });
  const { data: signer, isError, isLoading: isLoadingUseSigner } = useSigner();
  const [profile, setProfile] = useState<Profile | null>(null);
  useEffect(() => {
    async () => {
      let publicKeyCache = localStorage.getItem("publicKey");
      if (publicKeyCache) {
        if (profile) {
          setProfile({
            ...profile,
            publicKey: publicKeyCache,
          });
          return;
        }
        setProfile({
          name: "",
          profileImgUrl: "",
          publicKey: publicKeyCache,
        });
        return;
      }
      const message = "Hello dapp";
      if (signer) {
        const signature = await signer.signMessage(message);
        const pk = ethers.utils.recoverPublicKey(
          ethers.utils.arrayify(ethers.utils.hashMessage(message)),
          signature
        );
        setProfile({
          name: "",
          profileImgUrl: "",
          publicKey: "0x" + pk.slice(4),
        });
        localStorage.setItem("publicKey", "0x" + pk.slice(4));
      }
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (profile?.publicKey) {
        const collectionReference = db.collection("User");
        const { data, block } = await collectionReference
          .record(profile.publicKey)
          .get();
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
  }, [profile?.publicKey]);

  return [profile, setProfile];
}
