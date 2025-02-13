import useMetamask from "@/hooks/useMetamask";
import React from "react";

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
          w-[331px] h-[95px] bg-[#FFF]/25
          text-[#FFF] text-[40px]
          rounded-[195px]
          cursor-pointer
          hover:bg-[#FFF]/35
          pointer
          transition duration-200 ease-in-out
        "
      >
        START GAME
      </button>
    </div>
  );
};

export default Wallet;
