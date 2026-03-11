"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

export default function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className={styles.navList}>
        <li>
          <Link
            href="/"
            className={`${styles.navLink} ${pathname === "/" ? styles.active : ""}`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/catalog"
            className={`${styles.navLink} ${pathname === "/catalog" ? styles.active : ""}`}
          >
            Catalog
          </Link>
        </li>
      </ul>
    </nav>
  );
}
