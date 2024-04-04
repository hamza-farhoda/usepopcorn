import React from "react";
import Logo from "../componts/Logo";

function NabBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

export default NabBar;
