import clsx from "clsx";
import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import style from "./app.module.css";
import { useAppContext } from "./contexts/app";

export default function App() {
  const { openSidebar } = useAppContext();

  return (
    <main>
      <Sidebar />

      <section className={clsx(style.container, { [style["open-sidebar"]]: openSidebar })}>
        <Navbar />

        <div className={style.content}>
          <Outlet />
        </div>
      </section>
    </main>
  );
}
