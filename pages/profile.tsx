import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";
import { Polybase } from "@polybase/client";
import { useEffect } from "react";
import { ethPersonalSign } from "@polybase/eth";
import * as React from "react";
import { useSignMessage } from "wagmi";
import { verifyMessage } from "ethers/lib/utils";
import { useIsMounted } from "@/hooks";
import { Dialog } from "@headlessui/react";

// export function SignMessage() {
//   const recoveredAddress = React.useRef<string>();
//   const { data, error, isLoading, signMessage } = useSignMessage({
//     onSuccess(data, variables) {
//       // Verify signature when sign message succeeds
//       const address = verifyMessage(variables.message, data);
//       recoveredAddress.current = address;
//     },
//   });

//   return (
//     <>
//       <button
//         disabled={isLoading}
//         onClick={() => {
//           const message = "The quick brown fox…";
//           signMessage({ message });
//         }}
//       >
//         {isLoading ? "Check Wallet" : "Sign Message"}
//       </button>
//       {data && (
//         <div>
//           <div>Recovered Address: {recoveredAddress.current}</div>
//           <div>Signature: {data}</div>
//         </div>
//       )}
//     </>
//   );
// }

export default function Profile() {
  const { address, connector, isConnected } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ address });
  const { data: ensName } = useEnsName({ address });
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();
  const db = new Polybase({
    defaultNamespace:
      "pk/0xd51f360fa2f5ae76cdde0c5df29ec486efefb1d6aed136eb88837aeda8810baa1fa869f3f2b4ef567930e4f1072764494aaccc275e3acc3456cb87ee3bf56895/scaling-tree",
  });

  const isMounted = useIsMounted();
  let [isOpen, setIsOpen] = React.useState(false);

  if (!isMounted) return null;

  if (isConnected) {
    return (
      <div>
        {/* Account content goes here */}
        {/* <SignMessage /> */}
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
          <Dialog.Panel>
            <Dialog.Title>Deactivate account</Dialog.Title>
            <Dialog.Description>
              This will permanently deactivate your account
            </Dialog.Description>

            <p>
              Are you sure you want to deactivate your account? All of your data
              will be permanently removed. This action cannot be undone.
            </p>

            <button onClick={() => setIsOpen(false)}>Deactivate</button>
            <button onClick={() => setIsOpen(false)}>Cancel</button>
          </Dialog.Panel>
        </Dialog>
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
