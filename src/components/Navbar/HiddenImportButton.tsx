import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import parsePackage from "@/lib/package/parsePackage";
import { useDatabaseContext } from "@/contexts/database";

export default function HiddenImportButton() {
  const db = useDatabaseContext();
  const navigate = useNavigate();

  async function handleImport(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    // Read and parse the file content
    const content = await file.text();
    const parsed = parsePackage(content);

    if (!parsed.success) toast.error("Failed to import package");
    else {
      let updateId: string | null = null;

      // Check if package already exists
      const found = db.packages.data.find((pkg) => pkg.name === parsed.data.name);
      if (found && confirm("Package already exists, do you want to replace it?")) updateId = found.id;

      // Update or add the package
      if (updateId) {
        const res = db.packages.update(updateId, parsed.data);
        if (res.success) {
          toast.success("Package replaced successfully");
          navigate(`/packages/${updateId}`);
        } else toast.error(res.message);
      } else {
        const res = db.packages.add(parsed.data);
        toast.success("Package imported successfully");
        navigate(`/packages/${res.id}`);
      }
    }

    event.target.value = "";
  }

  return <input id="upload-package-file" onChange={handleImport} type="file" accept=".json" className="hidden" />;
}
