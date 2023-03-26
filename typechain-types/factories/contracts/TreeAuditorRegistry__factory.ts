/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  TreeAuditorRegistry,
  TreeAuditorRegistryInterface,
} from "../../contracts/TreeAuditorRegistry";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "auditor_",
        type: "address",
      },
    ],
    name: "AuditorAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "auditor_",
        type: "address",
      },
    ],
    name: "AuditorRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "auditor",
        type: "address",
      },
    ],
    name: "addAuditor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "auditors",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "auditor",
        type: "address",
      },
    ],
    name: "isAuditor",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "auditor",
        type: "address",
      },
    ],
    name: "removeAuditor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061002d61002261003260201b60201c565b61003a60201b60201c565b6100fe565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6107558061010d6000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c80638da5cb5b1161005b5780638da5cb5b146100ec578063e429cef11461010a578063e6116cfd14610126578063f2fde38b146101425761007d565b806347f9aa9f1461008257806349b90557146100b2578063715018a6146100e2575b600080fd5b61009c60048036038101906100979190610583565b61015e565b6040516100a991906105cb565b60405180910390f35b6100cc60048036038101906100c79190610583565b61017e565b6040516100d991906105cb565b60405180910390f35b6100ea6101d4565b005b6100f46101e8565b60405161010191906105f5565b60405180910390f35b610124600480360381019061011f9190610583565b610211565b005b610140600480360381019061013b9190610583565b6102b6565b005b61015c60048036038101906101579190610583565b610353565b005b60016020528060005260406000206000915054906101000a900460ff1681565b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff169050919050565b6101dc6103d6565b6101e66000610454565b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6102196103d6565b60018060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508073ffffffffffffffffffffffffffffffffffffffff167f2c31044378cc14466459f09320dd4057d7ad6e99b194c0800c78227383a2529660405160405180910390a250565b6102be6103d6565b600160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81549060ff02191690558073ffffffffffffffffffffffffffffffffffffffff167fd3e803f2dfdacd206b7d19aa46d847206386d84e3dc6b8de0926e54affa6fddc60405160405180910390a250565b61035b6103d6565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036103ca576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103c190610693565b60405180910390fd5b6103d381610454565b50565b6103de610518565b73ffffffffffffffffffffffffffffffffffffffff166103fc6101e8565b73ffffffffffffffffffffffffffffffffffffffff1614610452576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610449906106ff565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600033905090565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061055082610525565b9050919050565b61056081610545565b811461056b57600080fd5b50565b60008135905061057d81610557565b92915050565b60006020828403121561059957610598610520565b5b60006105a78482850161056e565b91505092915050565b60008115159050919050565b6105c5816105b0565b82525050565b60006020820190506105e060008301846105bc565b92915050565b6105ef81610545565b82525050565b600060208201905061060a60008301846105e6565b92915050565b600082825260208201905092915050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b600061067d602683610610565b915061068882610621565b604082019050919050565b600060208201905081810360008301526106ac81610670565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b60006106e9602083610610565b91506106f4826106b3565b602082019050919050565b60006020820190508181036000830152610718816106dc565b905091905056fea26469706673582212206789601158775c66583bfb43ec69e9f0537ada369ec911b07a879b36943a85ac64736f6c63430008120033";

type TreeAuditorRegistryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TreeAuditorRegistryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TreeAuditorRegistry__factory extends ContractFactory {
  constructor(...args: TreeAuditorRegistryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TreeAuditorRegistry> {
    return super.deploy(overrides || {}) as Promise<TreeAuditorRegistry>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): TreeAuditorRegistry {
    return super.attach(address) as TreeAuditorRegistry;
  }
  override connect(signer: Signer): TreeAuditorRegistry__factory {
    return super.connect(signer) as TreeAuditorRegistry__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TreeAuditorRegistryInterface {
    return new utils.Interface(_abi) as TreeAuditorRegistryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TreeAuditorRegistry {
    return new Contract(address, _abi, signerOrProvider) as TreeAuditorRegistry;
  }
}
