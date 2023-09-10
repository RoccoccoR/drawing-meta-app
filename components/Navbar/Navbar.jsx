import Link from "next/link";

export default function Navbar() {
  return (
    <div className="menuContainer">
      <Link className="menubarItem navBarDraw" href="/tool">
        Draw
      </Link>
      <Link className="menubarItem navBarArchive" href="/archive">
        Archive
      </Link>
      <Link className="menubarItem navBarProfile" href="/profile">
        Profile
      </Link>
      <Link className="menubarItem navBarInfo" href="/info">
        Info
      </Link>
    </div>
  );
}
