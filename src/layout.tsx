import { Toaster } from "react-hot-toast";

import App from "./app";
import HiddenFileInput from "./components/HiddenFileInput";

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
            <HiddenFileInput />
          </PackageContextProvider>
        </PackagesContextProvider>
      </DatabaseProvider>
    </AppContextProvider>
  );
}
