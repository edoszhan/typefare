"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { User, Trophy, MessageSquareText, Keyboard } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
    const pathname = usePathname();
    const { data: session } = useSession();
    const isAuthenticated = !!session?.user;

    return (
        <nav className="bg-background text-foreground px-6 py-4 flex items-center justify-between border-b border-border">
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

            {/* Profile / Auth */}
            <NavItem href={isAuthenticated ? "/dashboard" : "/auth"} icon={<User />} label={isAuthenticated ? (session?.user?.name || "Profile") : "Sign in"} pathname={pathname} />
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
  icon?: React.ReactNode;
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
