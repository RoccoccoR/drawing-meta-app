import "@/styles/globals.css";
import Layout from "../../components/Layout/Layout";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    // Check if screen orientation locking is supported by the browser
    if ("orientation" in screen) {
      // Lock the screen orientation to portrait
      async function lockScreenOrientation() {
        try {
          await screen.orientation.lock("portrait-primary");
          console.log("Screen orientation locked to portrait.");
        } catch (error) {
          console.error("Failed to lock screen orientation:", error);
        }
      }

      lockScreenOrientation();
    } else {
      console.log(
        "Screen orientation locking is not supported on this device/browser."
      );
    }
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts

  return (
    <>
      <SessionProvider session={session}>
        {router.pathname === "/" ? (
          // Don't render Layout on the root page
          <Component {...pageProps} />
        ) : (
          // Render Layout on all other pages
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </SessionProvider>
    </>
  );
}

export default MyApp;
