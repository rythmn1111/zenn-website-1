import React from "react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <Image src="/logo.png" alt="aura" width={500} height={500} />
      <p className="mt-4 text-2xl font-bold text-gray-400 text-center">zenn research</p>
    </div>
  );
}