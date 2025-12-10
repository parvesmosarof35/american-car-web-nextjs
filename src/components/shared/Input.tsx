"use client";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Input = ({
  placeholder,
  value,
  onChange,
  className = "",
  ...props
}: any) => {
  const navigate = useRouter();
  return (
    <div className="flex w-full">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`flex-1 px-5 py-3 border border-t-2 border-b-2 border-l-2 focus:border-r-0 border-gray-600 rounded-l-md text-center font-medium text-gray-700 focus:outline-none placeholder:text-gray-700 placeholder:font-bold ${className}`}
        {...props}
      />

      <button
        type="submit"
        onClick={() => {
          navigate.push(`/all-plates?${value}`);
        }}
        className="bg-[#00823A] hover:bg-green-700 text-white px-6 py-3 rounded-r-md transition-colors duration-200 flex items-center justify-center"
      >
        <Search className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Input;
