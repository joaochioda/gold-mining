import useMetamask from "@/hooks/useMetamask";
import React from "react";
import { Button } from "../ui/button";

const Wallet = () => {
  const { connectWallet } = useMetamask();

  return (
    <div
      className="h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/login-background.png')" }}
    >
      <button
        onClick={connectWallet}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          w-[331px] h-[95px] bg-[#FFF] bg-opacity-[0.15]
          text-[#FFF] text-[40px]
          rounded-[195px]
          hover:bg-[#FFF] hover:bg-opacity-[0.25]
          transition duration-200 ease-in-out
        "
      >
        START GAME
      </button>
    </div>
  );
};

export default Wallet;
