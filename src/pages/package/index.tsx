import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Body from "./components/Body";
import Header from "./components/Header";

import { emptyPackage } from "@/data/app";
import { usePackageContext } from "@/contexts/package";
import { useDatabaseContext } from "@/contexts/database";

export default function Package() {
  const params = useParams();
  const navigate = useNavigate();

  const db = useDatabaseContext();
  const { setPkg } = usePackageContext();

  useEffect(() => {
    // if database is not redy, wait for it
    if (!db.ready) return;

    // database is ready, find package by id
    const pkg = db.packages.data.find((p) => p.id === params.id);
    if (pkg) setPkg(pkg);
    else navigate("/packages");

    // clear package when unmount
    return () => setPkg(emptyPackage);
  }, [params, db.ready, db.packages.data]);

  return (
    <div className="space-y-2">
      <Header />
      <Body />
    </div>
  );
}
