"use client";

import Link from "next/link";
import React, { useContext } from "react";
import logo from "../assets/logo.png";
import Image from "next/image";
import { FitlogExersiceContext } from "@/app/Context/FitlogContex";

const Navbar = () => {
  const { plan, save } = useContext(FitlogExersiceContext);

  const Links = (
    <>
      <li>
        <Link
          href="/Card"
          className="bg-[#1a2e05] text-[#a3e635] font-medium rounded-full px-5 py-2 hover:bg-[#1a2e05]"
        >
          Workouts
        </Link>
      </li>

      <li>
        <Link href="/TodaysPlan">
          My Plan
        </Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-black text-white px-6 py-3 border-b border-zinc-800">

      {/* Left Section */}
      <div className="navbar-start">
        <div className="dropdown">

          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden text-white"
          >
            <svg
              aria-label="Menu"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-zinc-900 text-white rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {Links}
          </ul>
        </div>

        {/* Logo + Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 relative flex items-center justify-center">
            <Image
              src={logo}
              alt="FITLOG logo"
              width={28}
              height={28}
              className="object-contain"
            />
          </div>

          <span className="text-xl font-black tracking-wider text-white uppercase">
            FITLOG
          </span>
        </div>
      </div>

      {/* Center Section */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 px-1">
          {Links}
        </ul>
      </div>

      {/* Right Section */}
      <div className="navbar-end gap-5">

        {/* Plan Count */}
        <Link
          href="/TodaysPlan"
          className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white"
        >
          <span>Plan</span>

          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#a3e635] text-black font-semibold text-xs">
            {plan.length}
          </span>
        </Link>

        {/* Save Count */}
        <Link
          href="/save"
          className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white"
        >
          <span>Saved</span>

          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700 text-xs font-semibold">
            {save.length}
          </span>
        </Link>

      </div>
    </div>
  );
};

export default Navbar;