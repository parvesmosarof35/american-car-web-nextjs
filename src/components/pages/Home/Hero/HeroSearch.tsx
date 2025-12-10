"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/shared/Input";

export default function HeroSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleBuyClick = () => {
    router.push(`all-plates?${searchTerm}`);
  };

  const handleSellClick = () => {
    router.push(`userdashboard/list-plate?${searchTerm}`);
  };

  return (
    <section className="rounded-lg shadow-sm py-10 px-5 mb-6 max-w-[600px] mx-auto flex md:flex-row flex-col gap-2 md:gap-0.5 items-center">
      <Input
        type="text"
        placeholder="SEARCH PLATE"
        value={searchTerm}
        onChange={(e: any) => setSearchTerm(e.target.value)}
        className="grow rounded-l-md"
      />

      <button
        type="submit"
        onClick={handleBuyClick}
        className="ml-3 bg-yellow-300 text-black font-bold px-6 py-3 rounded-md transition-colors duration-200 flex items-center justify-center cursor-pointer hover:bg-yellow-400"
      >
        Buy
      </button>

      <button
        type="submit"
        onClick={handleSellClick}
        className="ml-3 bg-yellow-300 text-black font-bold px-6 py-3 rounded-md transition-colors duration-200 flex items-center justify-center cursor-pointer hover:bg-yellow-400"
      >
        Sell
      </button>
    </section>
  );
}
