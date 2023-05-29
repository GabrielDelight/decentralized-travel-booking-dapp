import React from "react";
import classes from "./HeaderStyles.module.css";
import { useCelo } from "@celo/react-celo";
const Header = () => {
  const { connect } = useCelo();
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <h1>DTBD</h1>
      </div>
      <nav>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Home</li>
          <li>
            <button onClick={connect}>Wallet connect</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
