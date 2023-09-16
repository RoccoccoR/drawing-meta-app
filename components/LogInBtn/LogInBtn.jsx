import { useSession, signIn, signOut } from "next-auth/react";

export default function LogInBtn() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        {/* Hey {session.user.name} <br /> */}
        {/* <img
          src={session.user.image}
          alt="user-image"
          style={{ borderRadius: "50px" }}
        /> */}

        <button className="menubarItem navBarProfile" onClick={() => signOut()}>
          <img className="menuIcon" src="/alien_1f47d.png" alt="Profile" />
          Logout
        </button>
      </>
    );
  }
  return (
    <>
      {/* Not signed in <br /> */}
      <button className="menubarItem navBarProfile" onClick={() => signIn()}>
        <img className="menuIcon" src="/alien_1f47d.png" alt="Profile" />
        Login
      </button>
    </>
  );
}
