"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, BugAntIcon } from "@heroicons/react/24/outline";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useIsParent } from "~~/hooks/kiddo-perks";
import { useOutsideClick } from "~~/hooks/scaffold-eth";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
  visibleTo: "both" | "parent" | "child";
};

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "Dashboard",
    href: "/",
    visibleTo: "both",
  },
  {
    label: "Children",
    href: "/children",
    visibleTo: "parent",
  },
  {
    label: "Tasks",
    href: "/tasks",
    visibleTo: "parent",
  },
  {
    label: "Perks",
    href: "/perks",
    visibleTo: "parent",
  },
  {
    label: "Debug Contracts",
    href: "/debug",
    icon: <BugAntIcon className="h-4 w-4" />,
    visibleTo: "parent",
  },
];

export const isVisibleToParent = (link: HeaderMenuLink): boolean => {
  return link.visibleTo == "parent" || link.visibleTo == "both";
};

export const isVisibleToChild = (link: HeaderMenuLink): boolean => {
  return link.visibleTo == "child" || link.visibleTo == "both";
};

export const HeaderMenuLinks = () => {
  const pathname = usePathname();
  const isParent = useIsParent();

  return (
    <>
      {menuLinks
        .filter(link => {
          return isParent != undefined && isParent ? isVisibleToParent(link) : isVisibleToChild(link);
        })
        .map(({ label, href, icon }) => {
          const isActive = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                passHref
                className={`${
                  isActive ? "bg-neutral shadow-md text-neutral-content " : ""
                } hover:bg-neutral hover:text-neutral-content hover:shadow-md focus:!bg-neutral focus:!text-neutral-content active:text-neutral-content py-1.5 px-3 text-sm gap-2 grid grid-flow-col`}
              >
                {icon}
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
    </>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  return (
    <div className="sticky lg:static top-0 navbar bg-base-300 min-h-0 flex-shrink-0 justify-between z-20 shadow-md shadow-neutral px-0 sm:px-2">
      <div className="navbar-start w-auto lg:w-1/2">
        <div className="lg:hidden dropdown" ref={burgerMenuRef}>
          <label
            tabIndex={0}
            className={`ml-1 btn btn-ghost ${isDrawerOpen ? "hover:bg-neutral" : "hover:bg-transparent"}`}
            onClick={() => {
              setIsDrawerOpen(prevIsOpenState => !prevIsOpenState);
            }}
          >
            <Bars3Icon className="h-1/2" />
          </label>
          {isDrawerOpen && (
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              <HeaderMenuLinks />
            </ul>
          )}
        </div>
        <Link href="/" passHref className="hidden lg:flex items-center gap-2 ml-4 mr-6 shrink-0">
          <div className="flex relative w-14 h-10">
            <Image alt="KiddoPerks Logo" className="cursor-pointer" fill src="/icon-black-nobg.png" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold leading-tight">KiddoPerks</span>
            <span className="text-xs">Gamified Rewards for kids</span>
          </div>
        </Link>
        <ul className="hidden lg:flex lg:flex-nowrap menu menu-horizontal px-1 gap-2">
          <HeaderMenuLinks />
        </ul>
      </div>
      <div className="navbar-end flex-grow mr-4">
        <RainbowKitCustomConnectButton />
        <FaucetButton />
      </div>
    </div>
  );
};
