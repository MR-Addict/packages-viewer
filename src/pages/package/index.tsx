import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Body from "./components/Body";
import Header from "./components/Header";

import { usePackageContext } from "@/contexts/package";

export default function Package() {
  const navigate = useNavigate();

  const { found } = usePackageContext();

  useEffect(() => {
    if (!found) navigate("/packages");
  }, [found]);

  return (
    <div className="space-y-2">
      <Header />
      <Body />
    </div>
  );
}
