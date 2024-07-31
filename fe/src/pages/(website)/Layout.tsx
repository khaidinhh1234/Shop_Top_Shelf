import { Outlet } from "react-router-dom";
import Footer from "./_component/Footer";
import Header from "./_component/Header";

const LayoutWebsite = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayoutWebsite;
