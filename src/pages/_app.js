import "@/styles/globals.css";
import Layout from "../../components/Layout/Layout";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router"; // Import the useRouter hook
import { Inter } from "next/font/google";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    const body = document.querySelector("body");

    // Check the current route and add a class to the body element for specific pages
    if (router.pathname === "/tool") {
      body.classList.add("backgroundWhite");
    } else {
      body.classList.remove("backgroundWhite");
    }
  }, [router.pathname]);

  return (
    <>
      <SessionProvider session={session}>
        {router.pathname === "/" ? (
          // Don't render Layout on the root page
          <>
            <style jsx global>{`
              html {
                font-family: ${inter.style.fontFamily};
              }
            `}</style>

            <Component {...pageProps} />
          </>
        ) : (
          // Render Layout on all other pages
          <Layout>
            <>
              <style jsx global>{`
                html {
                  font-family: ${inter.style.fontFamily};
                }
              `}</style>

              <Component {...pageProps} />
            </>
          </Layout>
        )}
      </SessionProvider>
    </>
  );
}

export default MyApp;
