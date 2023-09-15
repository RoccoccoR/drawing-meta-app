import React, { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="menuContainer">
      <a className="menubarItem navBarMenu" onClick={toggleMenu}>
        {menuOpen ? (
          <>
            <img
              className="menuIcon"
              src="/cross-mark_274c.png"
              alt="Menu Open"
            />
            Menu
          </>
        ) : (
          <>
            <img className="menuIcon" src="/hamburger_1f354.png" alt="Menu" />
            Menu
          </>
        )}
      </a>
      {menuOpen && (
        <div className="menuContainer">
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
          <Link className="menubarItem navBarProfile" href="/profile">
            <img className="menuIcon" src="/alien_1f47d.png" alt="Profile" />
            Profile
          </Link>
        </div>
      )}
      {/* <Link className="menubarItem navBarInfo" href="/info">
        Info
      </Link> */}
    </div>
  );
}
