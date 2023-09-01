import { NextAuthProvider } from "@/Providers";
import Navbar from "../Navbar/Navbar";
// import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <>
      <NextAuthProvider>
        <Navbar />
        <main>{children}</main>
        {/* <Footer /> */}
      </NextAuthProvider>
    </>
  );
}
