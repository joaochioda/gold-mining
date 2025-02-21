import useMetamask from "@/hooks/useMetamask";
import React from "react";

const Wallet = () => {
  const { connectWallet } = useMetamask();
  return (
    <div
      className="relative h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/login-background.png')" }}
    >
      <div className="absolute inset-0 bg-neutral-900 opacity-60" />

      <button
        onClick={connectWallet}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          w-[331px] h-[95px] bg-[#FFF]/15
          text-[#FFF] text-[40px]
          rounded-[195px]
          cursor-pointer
          hover:bg-[#FFF]/25
          transition duration-200 ease-in-out
          z-10
        "
      >
        START GAME
      </button>
    </div>
  );
};

export default Wallet;
