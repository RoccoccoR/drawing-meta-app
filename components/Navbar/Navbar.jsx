import React, { useState } from "react";
import Link from "next/link";
import LogInBtn from "../LogInBtn/LogInBtn";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="menuContainer">
      {isOpen ? (
        <button className="menubarItem navBarMenu" onClick={closeMenu}>
          <>
            <img
              className="menuIcon"
              src="/cross-mark_274c.png"
              alt="Menu Open"
            />
            Menu
          </>
        </button>
      ) : (
        <button className="menubarItem navBarMenu" onClick={toggleMenu}>
          <>
            <img className="menuIcon" src="/hamburger_1f354.png" alt="Menu" />
            Menu
          </>
        </button>
      )}
      {isOpen && (
        <div className="dropdownMenu">
          <Link className="menubarItem navBarDraw" href="/tool">
            <img
              className="menuIcon"
              src="/framed-picture_1f5bc-fe0f.png"
              alt="DrawTool"
            />
            Draw
          </Link>
          <Link className="menubarItem navBarArchive" href="/archive">
            <img
              className="menuIcon"
              src="/card-index-dividers_1f5c2-fe0f.png"
              alt="Archive"
            />
            Archive
          </Link>
          <Link className="menubarItem navBarProfile" href="/profile">
            <img
              className="menuIcon"
              src="/love-letter_1f48c.png"
              alt="Saved"
            />
            Saved
          </Link>
          <LogInBtn />
        </div>
      )}
    </div>
  );
}
