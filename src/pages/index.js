import { useRouter } from "next/router";
import IntroText from "../../components/IntroText/IntroText";
import MousePathTracker from "../../components/MouseTracker/MouseTracker";
import React from "react";
import LogInBtn from "../../components/LogInBtn/LogInBtn.jsx";
import { getSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();

  const goToSheetPage = () => {
    router.push("/tool");
  };

  return (
    <main className="main-container">
      <div className="background-container">
        <IntroText className="introText" />
        <LogInBtn onClick={goToSheetPage} />
      </div>
      <MousePathTracker />
    </main>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/tool",
      },
    };
  }
  return {
    props: { session },
  };
};
