//@ts-nocheck

"use client";

import useSWR, { mutate } from "swr";
import { useEffect } from "react";
import { ethers } from "ethers";

import { useRouter } from "next/navigation";
import { setCookieAddress, getCookie } from "@/utils";
import { useToast } from "./use-toast";

const useMetamask = () => {
  const { toast } = useToast();
  const router = useRouter();

  const handleAccounts = async (accounts: string[]) => {
    if (accounts.length > 0) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();

      if (network.chainId === 97n) {
        setCookieAddress(accounts[0]);
        router.push("/game");
      } else {
        toast({
          variant: "destructive",
          description: `Please connect to Binance Smart Chain Testnet.`,
          duration: 40000,
          position: "top-center",
        });
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
        await window.ethereum.enable();
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        await handleAccounts(accounts);
      } catch (error) {
        setCookieAddress(null);
      }
    } else {
      toast({
        variant: "destructive",
        description: `Please install MetaMask.`,
        duration: 40000,
        position: "top-center",
      });
    }
  };

  const logout = () => {
    mutate(() => true, undefined, { revalidate: false });
    setCookieAddress(null);
    router.push("/");
  };

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", () => {
        logout();
      });
    }

    return () => {
      if (typeof window.ethereum !== "undefined") {
        window.ethereum.removeListener("accountsChanged", logout);
      }
    };
  }, []);

  return { connectWallet, logout };
};

export default useMetamask;
