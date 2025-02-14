// import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Header2 from "./Header2";

import { Outlet } from "react-router-dom";
import Fashion from "../../pages/website/Fashion";

function Layout() {
  return (
    <>
      <Header />
      <hr size="4" color="gray" />
      <Header2 />
      <hr size="4" color="gray" />

      <main>
        <Fashion />
        <Outlet />
      </main>

      <hr size="4" color="gray" />
      <Footer />
    </>
  );
}

export default Layout;
