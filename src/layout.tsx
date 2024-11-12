import { Toaster } from "react-hot-toast";

import App from "./app";
import HiddenFileInput from "./components/HiddenFileInput";

import { AppContextProvider } from "./contexts/app";
import { DatabaseProvider } from "./contexts/database";
import { LocaleContextProvider } from "./contexts/locale";
import { PackagesContextProvider } from "./contexts/packages";

export default function Layout() {
  return (
    <LocaleContextProvider>
      <AppContextProvider>
        <DatabaseProvider>
          <PackagesContextProvider>
            <App />
            <Toaster />
            <HiddenFileInput />
          </PackagesContextProvider>
        </DatabaseProvider>
      </AppContextProvider>
    </LocaleContextProvider>
  );
}
