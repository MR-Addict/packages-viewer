import Body from "./components/Body";
import Header from "./components/Header";
import { PackageContextProvider } from "@/contexts/package";

export default function Package() {
  return (
    <div className="space-y-4">
      <PackageContextProvider>
        <Header />
        <Body />
      </PackageContextProvider>
    </div>
  );
}
