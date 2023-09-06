import { useSession, signIn, signOut } from "next-auth/react";

export default function LogInBtn() {
  const { data: session } = useSession();
  console.log(session);
  if (session) {
    return (
      <>
        Hey {session.user.name} <br />
        {/* <img
          src={session.user.image}
          alt="user-image"
          style={{ borderRadius: "50px" }}
        /> */}
        <button className="logOutBtn" onClick={() => signOut()}>
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button className="logInBtn" onClick={() => signIn()}>
        Sign in
      </button>
    </>
  );
}
