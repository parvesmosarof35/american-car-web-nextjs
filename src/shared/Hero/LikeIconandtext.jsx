import React from "react";

const LikeIconAndText = ({ imgSrc, text }) => {
  return (
    <div className="flex flex-col items-center text-gray-900 mt-10">
      <div className="flex items-center justify-center w-16 h-16 mb-3 ">
        <img
          src={imgSrc}
          alt="icon"
          className="size-20 object-contain"
        />
      </div>

      <p className="text-2xl md:text-3xl font-bold text-center">{text}</p>
    </div>
  );
};

export default LikeIconAndText;
