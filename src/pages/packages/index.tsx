import Body from "./component/Body";
import Empty from "./component/Empty";
import Header from "./component/Header";

import { usePackagesContext } from "@/contexts/packages";

export default function Packages() {
  const { packages } = usePackagesContext();

  if (packages.length === 0) return <Empty />;

  return (
    <div className="space-y-2">
      <Header />
      <Body packages={packages} />
    </div>
  );
}
