"use client";
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "../styles/layout.module.css";

export const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <Link
        className={`${styles.link} ${pathname === "/" ? styles.active : ""}`}
        href="/"
      >
        Home
      </Link>
      <Link
        className={`${styles.link} ${
          pathname === "/group/add-group" ? styles.active : ""
        }`}
        href="/group/add-group"
      >
        Add Group
      </Link>
      <Link
        className={`${styles.link} ${
          pathname === "/student/add-student" ? styles.active : ""
        }`}
        href="/student/add-student"
      >
        Add Student
      </Link>
    </nav>
  );
};
