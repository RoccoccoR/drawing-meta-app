import "@/styles/globals.css";
import Layout from "../../components/Layout/Layout";
import { SessionProvider } from "next-auth/react";
import LogInBtn from "../../components/LogInBtn/LogInBtn";

function MyApp({ Component, pageProps, session, router }) {
  // Check if the current route is the main page

  // Render the Layout component conditionally
  return (
    <>
      <SessionProvider session={session}>
        <Component {...pageProps} />
        <LogInBtn></LogInBtn>
      </SessionProvider>
    </>
  );
}

export default MyApp;
