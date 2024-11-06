import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <main className="flex-1 flex flex-col lg:flex-row">
      <Sidebar />

      <section className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-4 flex-1 flex flex-col">
          <Outlet />
        </div>
      </section>
    </main>
  );
}
