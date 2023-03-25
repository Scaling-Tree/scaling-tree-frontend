import { useRouter } from "next/router";
import React from "react";
import {
  BiHomeAlt,
  BiTrophy,
  BiNotification,
  BiUserCircle,
} from "react-icons/bi";
import { MdOutlineAddCircle } from "react-icons/md";

export default function BottomNavbar() {
  const router = useRouter();

  const isRouteActive = (route: string) => router.pathname === route;

  const navLeftItems = [
    { name: "Home", icon: BiHomeAlt, href: "/" },
    { name: "Leaderboard", icon: BiTrophy, href: "/leaderboard" },
  ];

  const navRightItems = [
    { name: "Notification", icon: BiNotification, href: "/notification" },
    { name: "Profile", icon: BiUserCircle, href: "/profile" },
  ];

  return (
    <div className="bg-white h-20 border-t shadow-2xl sticky bottom-0">
      <div className="max-w-[700px] h-full flex justify-between items-center mx-auto">
        {navLeftItems.map((item, i) => (
          <div
            key={i}
            onClick={() => router.push(item.href)}
            className={`cursor-pointer flex flex-col items-center justify-center  ${
              isRouteActive(item.href)
                ? "text-green-400"
                : "text-gray-500 hover:text-gray-400"
            }`}
          >
            <item.icon className="w-7 h-7 mb-1" />
            <span className="text-sm font-medium">{item.name}</span>
          </div>
        ))}
        <MdOutlineAddCircle className="text-green-400 w-14 h-14" />
        {navRightItems.map((item, i) => (
          <div
            key={i}
            onClick={() => router.push(item.href)}
            className={`cursor-pointer flex flex-col items-center justify-center  ${
              isRouteActive(item.href)
                ? "text-green-400"
                : "text-gray-500 hover:text-gray-400"
            }`}
          >
            <item.icon className="w-7 h-7 mb-1" />
            <span className="text-sm font-medium">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
