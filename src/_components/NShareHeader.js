import React from "react";
import { Link } from "react-router-dom";

const NShareHeader = () => {
  return (
    <header className="flex justify-between px-10 items-center bg-ncolor-primary md:h-10 h-16 text-white">
      <Link to="/navyashare" className="font-bold text-gray-100 text-lg">
        NavyaShare
      </Link>
      <Link to="/About" className="font-bold text-gray-100 text-lg">
        About
      </Link>
    </header>
  );
};

export default NShareHeader;
