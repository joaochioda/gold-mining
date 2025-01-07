//@ts-nocheck

"use client";

import { useEffect } from "react";
import { ethers } from "ethers";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "next/navigation";
import { setCookie, getCookie } from "@/utils";

const useMetamask = () => {
  const { user, setUser } = useUserStore();
  const router = useRouter();

  const handleAccounts = async (accounts: string[]) => {
    if (accounts.length > 0) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();

      if (network.chainId === 97n) {
        setUser(accounts[0]);
        setCookie(true);
      } else {
        setUser(null);
        setCookie(false);
      }
    } else {
      setUser(null);
      setCookie(false);
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
        console.error("Erro ao verificar a conexão com a MetaMask:", error);
        setUser(null);
        setCookie(false);
      }
    } else {
      setUser(null);
      setCookie(false);
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        await handleAccounts(accounts);
      } catch (error) {
        console.error("Erro ao conectar à MetaMask:", error);
        setUser(null);
        setCookie(false);
      }
    } else {
      window.alert("Por favor, instale a MetaMask para continuar");
    }
  };

  const logout = () => {
    setUser(null);
    setCookie(false);
    router.push("/");
  };

  const findUser = () => {
    const isLoggedIn = getCookie("isLoggedIn");
    if (user === null && isLoggedIn === "true") {
      connectWallet();
    }
  };

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", handleAccounts);
      window.ethereum.on("chainChanged", () => {
        checkIfWalletIsConnected();
      });
    }
  }, []);

  useEffect(() => {
    if (user) {
      router.push("/game");
    }
  }, [user]);

  return { connectWallet, logout, findUser };
};

export default useMetamask;
