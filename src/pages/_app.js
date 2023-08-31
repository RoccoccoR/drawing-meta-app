import "@/styles/globals.css";
import Layout from "../../components/Layout/Layout";

function MyApp({ Component, pageProps, router }) {
  // Check if the current route is the main page
  const isMainPage = router.pathname === "/";

  // Render the Layout component conditionally
  return (
    <>
      {isMainPage ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </>
  );
}

export default MyApp;
