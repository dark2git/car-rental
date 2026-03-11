import Link from "next/link";
import styles from "./Header.module.css";
import HeaderNav from "./HeaderNav.client";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo}>
          Rental<span>Car</span>
        </Link>
        <HeaderNav />
      </div>
    </header>
  );
}
