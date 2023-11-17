import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../components/ui/Navbar/Navbar";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
