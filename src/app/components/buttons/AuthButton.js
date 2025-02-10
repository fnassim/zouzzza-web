"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import fazzle from "../../fazzle.json";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const AuthButton = ({ text = "Sign in" }) => {
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClick = () => {
    if (status === "authenticated") {
      location.assign(fazzle.authentication.successUrl);
    } else {
      signIn(undefined, { callbackUrl: fazzle.authentication.successUrl });
    }
  };

  if (status === "authenticated") {
    return (
      <div className="relative" ref={dropdownRef}>
        {/* User Profile Button */}
        <button
          id="dropdownAvatarNameButton"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center text-sm font-medium text-[var(--color-text-primary)] bg-[var(--color-background)] border-2 border-[var(--color-border)] rounded-full focus:ring-4 focus:ring-[var(--color-border)] pl-1 pr-2 py-1"
          type="button"
        >
          <span className="sr-only">Open user menu</span>
          <Image
            width={32}
            height={32}
            src={session.user.image || "/default-avatar.png"}
            alt={session.user.name || "User"}
            className="w-8 h-8 me-2 rounded-full"
            referrerPolicy="no-referrer"
          />
          {session.user.name}
          <svg
            className="w-2.5 h-2.5 ms-3 stroke-[var(--color-text-primary)]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 z-10 w-44 bg-[var(--color-background)] border border-[var(--color-border)] divide-y divide-[var(--color-border)] rounded-lg shadow-md">
            <div className="px-4 py-3 text-sm text-[var(--color-text-primary)]">
              <div className="font-medium">Pro User</div>
              <div className="truncate">{session.user.email}</div>
            </div>
            <ul className="py-2 text-sm">
              <li>
                <a
                  href="/dashboard"
                  className="block px-4 py-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] transition"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/settings"
                  className="block px-4 py-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] transition"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="/earnings"
                  className="block px-4 py-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] transition"
                >
                  Earnings
                </a>
              </li>
            </ul>
            <div className="py-2">
              <button
                onClick={() => signOut()}
                className="block w-full px-4 py-2 text-left text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] transition"
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 text-[var(--color-button-text)] bg-[var(--color-buttons)] rounded-full shadow-md hover:bg-[var(--color-secondary)] transition"
    >
      {text}
    </button>
  );
};

export default AuthButton;
