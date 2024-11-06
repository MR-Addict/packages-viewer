import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Body from "./components/Body";
import Header from "./components/Header";

import { usePackageContext } from "@/contexts/package";
import { useDatabaseContext } from "@/contexts/database";

export default function Package() {
  const params = useParams();
  const navigate = useNavigate();

  const { setPkg } = usePackageContext();
  const db = useDatabaseContext();

  useEffect(() => {
    if (!db.imported) return;
    const pkg = db.packages.data.find((p) => p.id === params.id);
    if (pkg) setPkg(pkg);
    else navigate("/packages");
  }, [params, db.imported, db.packages.data]);

  return (
    <div>
      <Header />
      <Body />
    </div>
  );
}
