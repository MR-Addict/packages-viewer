import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

import { AppContextProvider } from "./contexts/app";
import { DatabaseProvider } from "./contexts/database";
import { PackagesContextProvider } from "./contexts/packages";

export default function Layout() {
  return (
    <AppContextProvider>
      <DatabaseProvider>
        <PackagesContextProvider>
          <Toaster />

          <main>
            <Sidebar />

            <section className="flex-1 flex flex-col">
              <Navbar />
              <div className="flex-1 p-4 flex flex-col">
                <Outlet />
              </div>
              <Footer />
            </section>
          </main>
        </PackagesContextProvider>
      </DatabaseProvider>
    </AppContextProvider>
  );
}
