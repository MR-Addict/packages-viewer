import Body from "./components/Body";
import Empty from "./components/Empty";
import Header from "./components/Header";

import { usePackagesContext } from "@/contexts/packages";

export default function Packages() {
  const { search, packages } = usePackagesContext();

  if (packages.length === 0) return <Empty />;

  return (
    <div className="space-y-4">
      <Header />
      <Body packages={packages.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))} />
    </div>
  );
}
