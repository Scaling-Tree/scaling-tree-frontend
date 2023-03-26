import { ADDRESS_LIST } from "../constants/addressList";
import { TreeController__factory } from "../typechain-types/factories/contracts/TreeController__factory";

const addNFT = async (
  signer: any,
  nftAddr: string,
  tokenId: number,
  treeAmount: number
) => {
  const treeControllerContract = TreeController__factory.connect(
    ADDRESS_LIST["TreeController"],
    signer
  );
  return treeControllerContract.addNFT(nftAddr, tokenId, treeAmount);
};

const mintNFT = async (signer: any, treeAmount: number, uri: string) => {
  const treeControllerContract = TreeController__factory.connect(
    ADDRESS_LIST["TreeController"],
    signer
  );
  return treeControllerContract.mintNFT(treeAmount, uri);
};

const treeControllerService = {
  addNFT,
  mintNFT,
};

export default treeControllerService;
