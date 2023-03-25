import { FaWallet } from "react-icons/fa";

const ConnectWalletBtn = () => {
  return (
    <button className="bg-transparent hover:opacity-70 text-green-400 border border-green-400 font-bold py-2 px-4 rounded-full flex items-center shadow-xl">
      <FaWallet className="mr-2" />
      Connect Wallet
    </button>
  );
};

export default ConnectWalletBtn;
