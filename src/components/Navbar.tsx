"use client";

import Hamburger from "hamburger-react";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-end items-end ">
      <Hamburger color="white" size={20} />
    </div>
  );
};

export default Navbar;
