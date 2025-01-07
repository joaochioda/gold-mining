// "use client";

import { getBalance } from "@/services/token";
import { useUserStore } from "@/stores/userStore";
import { useEffect, useState } from "react";

export default async function GameContainer() {
  // const [balance, setBalance] = useState("");
  const user = "0x0521ed90ab0edbf89d3bba4ea3c21b300c50840c";

  // useEffect(() => {
  //   if (!user) return;
  //   async function fetchBalance() {
  const balance = await getBalance(user!);
  //     setBalance(balance);
  //   }
  //   fetchBalance();
  // }, [user]);

  return (
    <>
      <p>game</p>
      {balance && <p>Balance: {balance}</p>}
    </>
  );
}
