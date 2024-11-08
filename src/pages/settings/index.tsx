import Theme from "./components/Theme";
import PackageManager from "./components/PackageManager";
import ClearStorage from "./components/ClearStorage";

export default function Settings() {
  return (
    <div className="space-y-4">
      <Theme />
      <PackageManager />
      <ClearStorage />
    </div>
  );
}
