import Link from "next/link";

export default function Navbar() {
  return (
    <div className="menuContainer">
      <Link className="menubarItem" href="/tool">
        Draw
      </Link>
      <Link className="menubarItem" href="/archive">
        Archive
      </Link>
      <Link className="menubarItem" href="/profile">
        Profile
      </Link>
      <Link className="menubarItem" href="/info">
        Info
      </Link>
    </div>
  );
}
