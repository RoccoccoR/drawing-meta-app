import "@/styles/globals.css";
import Layout from "../../components/Layout/Layout";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router"; // Import the useRouter hook

function MyApp({ Component, pageProps, session }) {
  const router = useRouter(); // Initialize the router

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
