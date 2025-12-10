import React from "react";
import Swal from "sweetalert2";
import { Facebook, Twitter, MessageCircle, Share2 } from "lucide-react";

export default function ShareButtons() {
  const handleShare = async () => {
    const url = window.location.href; // current page URL
    try {
      await navigator.clipboard.writeText(url);
      Swal.fire({
        icon: "success",
        title: "Link copied!",
        text: "The advert link has been copied to your clipboard.",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to copy the link. Try again!" + err,
      });
    }
  };

  return (
    <div className="flex justify-center items-center gap-3 mb-6 text-xl text-gray-800 font-medium">
      <span className="mr-2">Share Advert:</span>
      <button
        onClick={handleShare}
        className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors cursor-pointer"
      >
        <Facebook className="w-4 h-4 text-white" />
      </button>
      <button
        onClick={handleShare}
        className="w-8 h-8 bg-blue-400 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors cursor-pointer"
      >
        <Twitter className="w-4 h-4 text-white" />
      </button>
      <button
        onClick={handleShare}
        className="w-8 h-8 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors cursor-pointer"
      >
        <MessageCircle className="w-4 h-4 text-white" />
      </button>
      <button
        onClick={handleShare}
        className="w-8 h-8 bg-gray-400 hover:bg-gray-500 rounded-full flex items-center justify-center transition-colors cursor-pointer"
      >
        <Share2 className="w-4 h-4 text-white" />
      </button>
    </div>
  );
}
