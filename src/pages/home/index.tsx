import Body from "./components/Body";
import Header from "./components/Header";

import { useDatabaseContext } from "@/contexts/database";
import { usePackagesContext } from "@/contexts/packages";

export default function Home() {
  const db = useDatabaseContext();
  const { search, packages } = usePackagesContext();

  if (!db.ready) return null;

  return (
    <div className="space-y-4">
      <Header />
      <Body packages={packages.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))} />
    </div>
  );
}
