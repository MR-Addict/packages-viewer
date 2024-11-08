import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Body from "./components/Body";
import Header from "./components/Header";
import { useDatabaseContext } from "@/contexts/database";

export default function Package() {
  const navigate = useNavigate();
  const db = useDatabaseContext();

  const { id } = useParams();

  useEffect(() => {
    if (db.ready && !db.packages.data.find((d) => d.id === id)) navigate("/packages");
  }, [id, db.ready, db.packages.data]);

  return (
    <div className="space-y-4">
      <Header />
      <Body />
    </div>
  );
}
