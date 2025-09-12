"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Trophy, MessageSquareText, Keyboard } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
    const pathname = usePathname();
    const isAuthenticated = false;

    return (
        <nav className="bg-[#0B0E13] text-white px-6 py-4 flex items-center justify-between">
            {/* Left: Website Name and Logo*/}
            <Link href="/">
                <Image src="/typefare-logo.jpg" alt="typefare" width={250} height={150} priority/>
            </Link>

            {/* Middle: Free space */}
            <div className="flex-grow"></div>

            {/* Right: Navigation Links */}
            <div className="flex gap-6 items-center">
            <NavItem href="/practice" icon={<Keyboard />} label="Practice" pathname={pathname} />
            <NavItem href="/leaderboards" icon={<Trophy />} label="Leaderboards" pathname={pathname} />
            {/* <NavItem href="/discussion" icon={<MessageSquareText />} label="Discussion" pathname={pathname} /> */}

            {/* Profile Link (Auth Handling Later) */}
            <NavItem href={isAuthenticated ? "/dashboard" : "/auth"} icon={<User />} label="Profile" pathname={pathname} />
            </div>
        </nav>
        );
    };

export const NavItem = ({
  href,
  icon,
  label,
  pathname,
}: {
  href: string;
  icon?: JSX.Element;
  label: string;
  pathname: string;
}) => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-2 py-5 text-lg font-bold transition hover:opacity-80 ${
        pathname === href ? "text-blue-400" : ""
      }`}
    >
      {icon && <span>{icon}</span>} {label}
    </Link>
  );
};

export default Navbar;
