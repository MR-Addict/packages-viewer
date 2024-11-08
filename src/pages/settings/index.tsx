import Theme from "./components/Theme";
import PackageManager from "./components/PackageManager";

export default function Settings() {
  return (
    <div className="space-y-4">
      <Theme />
      <PackageManager />
    </div>
  );
}
