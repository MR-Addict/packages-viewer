import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { fileInputID } from "@/data/app";
import { useAppContext } from "@/contexts/app";
import { useDatabaseContext } from "@/contexts/database";
import parsePackage from "@/lib/package/parsePackage";

export default function HiddenFileInput() {
  const db = useDatabaseContext();
  const navigate = useNavigate();
  const { fileInputRef } = useAppContext();

  async function handleImport(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    // Read and parse the file content
    const content = await file.text();
    const parsed = parsePackage(content);

    if (!parsed.success) toast.error("Failed to import package");
    else {
      let pkgId: string | null = fileInputRef.current?.getAttribute("data-pkg-id") || null;

      // Check if package already exists
      if (!pkgId) {
        const found = db.packages.data.find((pkg) => pkg.name === parsed.data.name);
        if (found && confirm("Package already exists, do you want to replace it?")) pkgId = found.id;
      }

      // Update or add the package
      if (pkgId) {
        const res = db.packages.update(pkgId, parsed.data);
        if (res.success) {
          toast.success("Package replaced successfully");
          navigate(`/packages/${pkgId}`);
        } else toast.error(res.message);
      } else {
        const res = db.packages.add(parsed.data);
        toast.success("Package imported successfully");
        navigate(`/packages/${res.id}`);
      }
    }

    fileInputRef.current?.removeAttribute("data-pkg-id");
    event.target.value = "";
  }

  return (
    <input ref={fileInputRef} id={fileInputID} onChange={handleImport} type="file" accept=".json" className="hidden" />
  );
}
