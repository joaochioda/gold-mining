import { ethers } from "ethers";

export const setCookieAddress = (value: string | null) => {
  document.cookie = `address=${value}; path=/; max-age=31536000`;
};

export const getAddress = (): string | null => {
  const fullAddress = getCookie("address");
  return fullAddress
    ? fullAddress.slice(0, 5) + "..." + fullAddress.slice(-4)
    : null;
};

export const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

export const sliceNumber = (number: string, start: number, end: number) => {
  return number.slice(start, number.indexOf(".") + end);
};

export function typeDictionary(type: number) {
  const typeDict: Record<number, string> = {
    0: "Worker",
    1: "Machine 1",
    2: "Machine 2",
  };
  return typeDict[type];
}

export function rarityDictionary(rarity: number) {
  const rarityDict: Record<number, string> = {
    0: "Normal",
    1: "Uncommon",
    2: "Rare",
    3: "Epic",
  };
  return rarityDict[rarity];
}

export const getSigner = async () => {
  //@ts-ignore
  if (typeof window.ethereum !== "undefined") {
    //@ts-ignore
    const provider = new ethers.BrowserProvider(window.ethereum);
    return provider.getSigner();
  } else {
    throw new Error("MetaMask não está instalada");
  }
};
