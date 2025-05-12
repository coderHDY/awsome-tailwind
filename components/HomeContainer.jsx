"use client";
import React, { useState, useEffect } from "react";
import { toggleTheme } from "@/utils/theme";
import ThemeController from "./themeController";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function HomeContainer() {
  const router = useRouter();
  return (
    <div className="flex flex-col  bg-base-100 p-2">
      <button
        onClick={toggleTheme}
        className="w-40 mr-4 px-4 py-4 bg-primary text-primary-content rounded-full font-bold shadow-lg hover:bg-primary-focus transition duration-300 ease-in-out"
      >
        切换主题
      </button>
      <ThemeController />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <span className="text-3xl text-base-content">
          Welcome to <span className="text-blue-600">Next.js</span>
        </span>
        <span className="text-xl font-semibold text-base-content">
          Learn{" "}
          <a href="https://nextjs.org" className="text-blue-600">
            Next.js
          </a>{" "}
          by building real apps with{" "}
          <a href="https://vercel.com/postgres" className="text-blue-600">
            Vercel Postgres
          </a>
        </span>
        <button className="min-w-2xl mb-3 cursor-pointer rounded-2xl bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">
          Button
        </button>
        <button className="min-w-2xl btn btn-primary">Button</button>

        <div className="p-10 dark:p-20  text-base-content">
          I will have 10 padding on winter theme and 20 padding on night theme
        </div>
      </div>
    </div>
  );
}
