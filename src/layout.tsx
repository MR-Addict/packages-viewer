import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";

export default function Layout() {
  return (
    <main>
      <Sidebar />

      <section className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 p-4">
          <Outlet />
        </div>
        <Footer />
      </section>
    </main>
  );
}
