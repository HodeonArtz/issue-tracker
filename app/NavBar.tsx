"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { Box, Container, Flex } from "@radix-ui/themes";

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className=" border-b mb-5 px-5 py-3 ">
      <Container>
        <Flex gap="6" align="center">
          <Link href="/">
            <FaBug />
          </Link>
          <Flex justify="between" align="center" width="100%">
            <ul className="flex gap-6">
              {links.map((link, i) => (
                <li key={i}>
                  <Link
                    className={classNames({
                      "text-zinc-900": link.href === currentPath,
                      "text-zinc-500": link.href !== currentPath,
                      "hover:text-zinc-800 transition-colors": true,
                    })}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Box>
              {status === "authenticated" && (
                <Link href="/api/auth/signout">Log out</Link>
              )}
              {status === "unauthenticated" && (
                <Link href="/api/auth/signin">Log in</Link>
              )}
            </Box>
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
