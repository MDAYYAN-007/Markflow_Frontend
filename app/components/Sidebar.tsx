"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Layers,
  Star,
  Compass,
  PlusSquare,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const linkClass = (active: boolean) =>
    `px-3 py-2 rounded-lg w-full flex items-center gap-3 transition
     ${
       active
         ? "bg-[#202020] text-white"
         : "text-gray-400 hover:bg-[#202020] hover:text-white"
     }`;

  return (
    <div className="w-64 bg-[#181818] border-r border-[#515151] px-6 py-6 flex flex-col items-center sticky top-0 h-screen">
      <Image
        src="/logo.png"
        width={140}
        height={106}
        alt="Logo"
        className="mb-8"
      />

      <nav className="space-y-2 flex flex-col items-start w-full font-mono">
        <Link href="/" className={linkClass(isActive("/"))}>
          <Home size={18} />
          Home
        </Link>

        <Link href="/categories" className={linkClass(isActive("/categories"))}>
          <Layers size={18} />
          Categories
        </Link>

        <Link href="/frequent" className={linkClass(isActive("/frequent"))}>
          <Star size={18} />
          Frequent
        </Link>

        <Link href="/explore" className={linkClass(isActive("/explore"))}>
          <Compass size={18} />
          Explore
        </Link>

        <Link
          href="/add-bookmark"
          className={linkClass(isActive("/add-bookmark"))}
        >
          <PlusSquare size={18} />
          Add Bookmark
        </Link>

        <Link href="/settings" className={linkClass(isActive("/settings"))}>
          <Settings size={18} />
          Settings
        </Link>
      </nav>

      <div className="mt-auto text-xs text-gray-500">© 2025 Markflow</div>
    </div>
  );
};

export default Sidebar;
