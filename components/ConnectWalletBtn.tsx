import { FaWallet } from "react-icons/fa";
import { useIsMounted } from "@/hooks";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";

const ConnectWalletBtn = () => {
  const { address, connector, isConnected } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ address });
  const { data: ensName } = useEnsName({ address });
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();
  const isMounted = useIsMounted();
  if (!isMounted) return null;
  return (
    <button
      onClick={() => {
        if (isConnected) {
          disconnect();
        } else {
          if (connectors?.find((c) => c.name === "MetaMask")) {
            connect({
              connector: connectors?.find((c) => c.name === "MetaMask"),
            });
          }
        }
      }}
      className="bg-transparent hover:opacity-70 text-green-400 border border-green-400 font-bold py-2 px-4 rounded-full flex items-center shadow-xl"
    >
      <FaWallet className="mr-2" />
      {isConnected ? ensName || `${address?.slice(0, 8)}...` : "Connect Wallet"}
    </button>
  );
};

export default ConnectWalletBtn;
