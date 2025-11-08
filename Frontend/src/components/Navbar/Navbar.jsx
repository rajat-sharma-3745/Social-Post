import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { logout } = useAppContext();

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        Social Post
      </Link>

      <button
        onClick={logout}
        type="button"
        className={styles.logoutButton}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
