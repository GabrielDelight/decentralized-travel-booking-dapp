import React from "react";
import classes from "./HeaderStyles.module.css"
const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}><h1>DTBD</h1></div>
      <nav>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Home</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
