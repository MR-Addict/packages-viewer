import Theme from "./components/Theme";
import Language from "./components/Language";
import AppVersion from "./components/AppVersion";
import ClearStorage from "./components/ClearStorage";
import PackageManager from "./components/PackageManager";

export default function Settings() {
  return (
    <div className="space-y-6">
      <AppVersion />
      <PackageManager />
      <Theme />
      <Language />
      <ClearStorage />
    </div>
  );
}
