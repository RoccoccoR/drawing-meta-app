import { useRouter } from "next/router";
import IntroStartBtn from "../../components/IntroStartBtn/IntroStartBtn.jsx";
import IntroText from "../../components/IntroText/IntroText";
import MousePathTracker from "../../components/MouseTracker/MouseTracker";
import React from "react";

export default function Home() {
  const router = useRouter();

  const goToSheetPage = () => {
    router.push("/tool");
  };

  return (
    <main className="main-container">
      <div className="background-container">
        <IntroText />
        <IntroStartBtn onClick={goToSheetPage} />
      </div>
      <MousePathTracker />
    </main>
  );
}
