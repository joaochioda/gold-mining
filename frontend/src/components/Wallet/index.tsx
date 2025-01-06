import useMetamask from "@/hooks/useMetamask";
import React from "react";

const Wallet = () => {
  const { connectWallet } = useMetamask();

  return (
    <div>
      <button onClick={connectWallet}>Entrar no jogo</button>
    </div>
  );
};

export default Wallet;
