"use client";

import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import fazzle from "./fazzle.json";

const RootClient = ({ children }) => {
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.querySelector("html")?.setAttribute("data-theme", fazzle.theme.color);
      document.querySelector("html")?.setAttribute("data-mode", fazzle.theme.isDark ? "dark" : "");
    }
  }, []);

  return <SessionProvider>{children}</SessionProvider>;
};

export default RootClient;
