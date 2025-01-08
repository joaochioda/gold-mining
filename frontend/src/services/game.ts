import { getSigner } from "@/utils";
import { ethers } from "ethers";

const abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
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
    inputs: [],
    name: "calculateTotalRewards",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "claimRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getStakedNFTs",
    outputs: [
      {
        internalType: "uint256[]",
        name: "tokenIds",
        type: "uint256[]",
      },
      {
        internalType: "enum INFT.NFTType[]",
        name: "nftTypes",
        type: "uint8[]",
      },
      {
        internalType: "enum INFT.Rarity[]",
        name: "rarities",
        type: "uint8[]",
      },
      {
        internalType: "uint256[]",
        name: "stakedAts",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "rewards",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "gmineToken",
    outputs: [
      {
        internalType: "contract IGMINE",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nftContract",
    outputs: [
      {
        internalType: "contract INFT",
        name: "",
        type: "address",
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
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum INFT.NFTType",
        name: "",
        type: "uint8",
      },
    ],
    name: "rewardsPerDay",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_gmineToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_nftContract",
        type: "address",
      },
    ],
    name: "setContracts",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "stakeNFT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "stakes",
    outputs: [
      {
        internalType: "uint256",
        name: "stakedAt",
        type: "uint256",
      },
    ],
    stateMutability: "view",
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
];

export async function stakeNFT(tokenId: number) {
  const signer = await getSigner();

  const contractAddress = process.env.NEXT_PUBLIC_TOKEN_GAME!;

  const contract = new ethers.Contract(contractAddress, abi, signer);

  const tx = await contract.stakeNFT(tokenId, {
    gasLimit: 300000,
  });

  try {
    const receipt = await tx.wait();
    return receipt;
  } catch (error) {
    return "error";
  }
}

export async function getNFTs() {
  const signer = await getSigner();

  const contractAddress = process.env.NEXT_PUBLIC_TOKEN_GAME!;

  const contract = new ethers.Contract(contractAddress, abi, signer);

  const nfts = await contract.getStakedNFTs();

  return nfts;
}
