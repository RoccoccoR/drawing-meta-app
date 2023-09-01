import { useSession, signIn, signOut } from "next-auth/react";

export default function LogInBtn() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Hey {session.user.name} <br />
        {/* <img
          src={session.user.image}
          alt="user-image"
          style={{ borderRadius: "50px" }}
        /> */}
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
