import React from "react";
import NavComponent from "./nav-component";

function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-background">
      <div className="sm:px-12 px-6 flex items-center h-20 space-x-0 justify-between sm:space-x-0">
        <NavComponent />
      </div>
    </header>
  );
}

export default Header;
