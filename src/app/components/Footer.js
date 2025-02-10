"use client";

import fazzle from "../fazzle.json";
import Link from "next/link";
import { SocialIcon } from "react-social-icons";

const Footer = () => {
  const { footer, productName } = fazzle;

  return (
    <footer className="bg-[var(--color-background)] text-[var(--color-text-primary)] w-full">
      <div className=" w-full py-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          {/* Company Name */}
          <div className="mb-6 md:mb-0">
            <Link href={footer.companyUrl} className="flex items-center">
              <span
                className="self-center text-xl font-extrabold tracking-wider 
                bg-gradient-to-r from-[var(--color-gradient-start)] 
                to-[var(--color-gradient-end)] text-transparent bg-clip-text"
              >
                {productName}
              </span>
            </Link>
          </div>

          {/* Dynamic Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-6 xl:grid-cols-4">
            {/* Menu */}
            <div>
              <h2 className="mb-6 text-sm font-semibold text-[var(--color-primary)] uppercase">
                {footer.menu.title}
              </h2>
              <ul className="text-[var(--color-text-primary)] opacity-80 font-medium">
                {footer.menu.items.map((item, index) => (
                  <li key={index} className="mb-4">
                    <Link
                      href={item.route}
                      className="hover:text-[var(--color-primary)] transition"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h2 className="mb-6 text-sm font-semibold text-[var(--color-primary)] uppercase">
                {footer.resources.title}
              </h2>
              <ul className="text-[var(--color-text-primary)] opacity-80 font-medium">
                {footer.resources.items.map((item, index) => (
                  <li key={index} className="mb-4">
                    <Link
                      href={item.route}
                      className="hover:text-[var(--color-primary)] transition"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h2 className="mb-6 text-sm font-semibold text-[var(--color-primary)] uppercase">
                {footer.legal.title}
              </h2>
              <ul className="text-[var(--color-text-primary)] opacity-80 font-medium">
                {footer.legal.items.map((item, index) => (
                  <li key={index} className="mb-4">
                    <Link
                      href={item.route}
                      className="hover:text-[var(--color-primary)] transition"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Separator */}
        <hr className="my-6 border-[var(--color-border)] w-full lg:my-8" />

        {/* Social Links & Copyright */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-[var(--color-text-primary)] opacity-80 sm:text-center">
            {footer.copyright}
          </span>

          <div className="flex mt-4 sm:justify-center sm:mt-0 gap-3">
            {footer.socialLinks.map((social, index) => (
              <SocialIcon
                key={index}
                network={social.name}
                url={social.link}
                bgColor="var(--color-primary)"
                fgColor="var(--color-text-light)"
                style={{
                  height: 32,
                  width: 32,
                  transition: "all 0.3s ease-in-out",
                }}
                className="hover:opacity-80"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
