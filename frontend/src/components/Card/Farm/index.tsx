import Image from "next/image";

export default function Farm({ value }: { value: string }) {
  return (
    <p className="flex items-center text-[18px] text-yellow justify-center gap-2">
      <Image src="/images/gold.png" width={31} height={31} alt="Coin" />${value}
    </p>
  );
}
