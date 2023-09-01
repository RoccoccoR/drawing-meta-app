import { useSession, signOut } from "next-auth/react";

export default function Profile() {
  const { data: session, status } = useSession({ required: true });
  if (!session) {
    return <>Loading...</>;
  }
}
