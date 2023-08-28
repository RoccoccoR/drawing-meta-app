import { useRouter } from "next/router";
import IntroButtonStart from "../../components/IntroButtonStart/IntroButtonStart";
import IntroText from "../../components/IntroText/IntroText";
import MousePathTracker from "../../components/MouseTracker/MouseTracker";

export default function Home() {
  const router = useRouter();

  const goToSheetPage = () => {
    router.push("/sheet");
  };

  return (
    <main className="main-container">
      <div className="background-container">
        <IntroText />
        <IntroButtonStart onClick={goToSheetPage} />
      </div>
      <MousePathTracker />
    </main>
  );
}
