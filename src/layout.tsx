import { Toaster } from "react-hot-toast";

import App from "./app";
import { AppContextProvider } from "./contexts/app";
import { DatabaseProvider } from "./contexts/database";
import { PackageContextProvider } from "@/contexts/package";
import { PackagesContextProvider } from "./contexts/packages";

export default function Layout() {
  return (
    <AppContextProvider>
      <DatabaseProvider>
        <PackagesContextProvider>
          <PackageContextProvider>
            <App />
            <Toaster />
          </PackageContextProvider>
        </PackagesContextProvider>
      </DatabaseProvider>
    </AppContextProvider>
  );
}
