"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import AuthButton from "./buttons/AuthButton";
import fazzle from "../fazzle.json";

const headerMenuItems = [
  { route: "/#pricing", name: "Pricing" },
  { route: "/#testimonials", name: "Reviews" },
  { route: "/#faq", name: "FAQ" },
];

const handleSmoothScroll = (hash) => {
  if (!hash) return;
  const targetElement = document.getElementById(hash.replace("#", ""));

  if (targetElement) {
    setTimeout(() => {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);

    window.history.pushState(null, "", hash);
  }
};

const NavigationMenu = ({ items }) => {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState(pathname);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setActivePath(window.location.pathname + window.location.hash);
    }
  }, [pathname]);

  return (
    <div className="hidden lg:flex items-center gap-8 ml-24 font-medium">
      {items.map((item) => {
        const hash = item.route.split("#")[1];

        return (
          <a
            key={item.route}
            href={item.route}
            onClick={(e) => {
              e.preventDefault();
              handleSmoothScroll(`#${hash}`);
              setActivePath(item.route);
            }}
            className={`$ {
              activePath === item.route
                ? "text-[var(--color-primary)] font-bold"
                : "text-[var(--color-text-primary)]"
            }`}
          >
            {item.name}
          </a>
        );
      })}
    </div>
  );
};

const MobileMenu = ({ isOpen, onClose, items }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 z-40 flex flex-col items-center w-full py-6 space-y-6 bg-[var(--color-background)] text-[var(--color-text-primary)] font-medium">
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl">
          ✕
        </button>
        {items.map((item) => {
          const hash = item.route.split("#")[1];

          return (
            <a
              key={item.route}
              href={item.route}
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll(`#${hash}`);
                onClose();
              }}
              className="text-lg text-[var(--color-text-primary)] hover:text-[var(--color-primary)]"
            >
              {item.name}
            </a>
          );
        })}
        <div className="flex justify-center w-full">
          <AuthButton extraStyle="btn-primary" />
        </div>
      </div>
    )
  );
};

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setIsMobileMenuOpen(false);
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <header className="top-0 w-full z-50 bg-[var(--color-background)] text-[var(--color-text-primary)]">
      <nav className="flex w-full items-center justify-between py-4">
        <div className="flex lg:flex-1 items-center">
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-wider bg-gradient-to-r from-[var(--color-gradient-start)] to-[var(--color-gradient-end)] text-transparent bg-clip-text"
          >
            {fazzle.productName}
          </Link>
          <NavigationMenu items={headerMenuItems} />
        </div>

        <div className="lg:hidden">
          <button onClick={() => setIsMobileMenuOpen(true)} className="text-2xl">
            ☰
          </button>
        </div>

        <div className="hidden lg:flex lg:flex-grow lg:justify-end">
          <AuthButton extraStyle="btn-primary" />
        </div>
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        items={headerMenuItems}
      />
    </header>
  );
};

export default Header;
