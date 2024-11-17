import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="py-4 px-8 flex flex-col min-h-screen bg-slate-100">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
