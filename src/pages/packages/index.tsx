import Body from "./component/Body";
import Empty from "./component/Empty";
import Header from "./component/Header";

import { useDatabaseContext } from "@/contexts/database";

export default function Packages() {
  const db = useDatabaseContext();

  if (db.packages.data.length === 0) return <Empty />;

  return (
    <div className="space-y-2">
      <Header />
      <Body packages={db.packages.data} />
    </div>
  );
}
