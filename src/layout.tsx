import { Toaster } from "react-hot-toast";

import App from "./app";
import HiddenFileInput from "./components/HiddenFileInput";

import { AppContextProvider } from "./contexts/app";
import { DatabaseProvider } from "./contexts/database";
import { PackageContextProvider } from "@/contexts/package";
import { PackagesContextProvider } from "./contexts/packages";
import { LocaleContextProvider } from "./contexts/locale";

export default function Layout() {
  return (
    <LocaleContextProvider>
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
    </LocaleContextProvider>
  );
}
