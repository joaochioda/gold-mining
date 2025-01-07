//@ts-nocheck

"use client";

import { useEffect } from "react";
import { ethers } from "ethers";

import { useRouter } from "next/navigation";
import { setCookieAddress, getCookie } from "@/utils";

const useMetamask = () => {
  const router = useRouter();

  const handleAccounts = async (accounts: string[]) => {
    if (accounts.length > 0) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();

      if (network.chainId === 97n) {
        setCookieAddress(accounts[0]);
        router.push("/game");
      } else {
        setCookieAddress(null);
      }
    } else {
      setCookieAddress(null);
    }
  };

  const checkIfWalletIsConnected = async () => {
    const cookieStatus = getCookie("isLoggedIn");

    if (cookieStatus === true && typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_accounts", []);
        await handleAccounts(accounts);
      } catch (error) {
        setCookieAddress(null);
      }
    } else {
      setCookieAddress(null);
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        await handleAccounts(accounts);
      } catch (error) {
        setCookieAddress(null);
      }
    } else {
      window.alert("Por favor, instale a MetaMask para continuar");
    }
  };

  const logout = () => {
    setCookieAddress(null);
    router.push("/");
  };

  return { connectWallet, logout };
};

export default useMetamask;
