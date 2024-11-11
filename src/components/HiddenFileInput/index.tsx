import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { fileInputID } from "@/data/app";
import { useAppContext } from "@/contexts/app";
import { useLocaleContext } from "@/contexts/locale";
import { useDatabaseContext } from "@/contexts/database";

import parsePackage from "@/lib/package/parsePackage";

export default function HiddenFileInput() {
  const navigate = useNavigate();
  const db = useDatabaseContext();

  const { translate } = useLocaleContext();
  const ta = (label: string) => translate(label, "api");

  const { fileInputRef } = useAppContext();

  async function handleImport(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    // Read and parse the file content
    const content = await file.text();
    const parsed = parsePackage(content);

    if (!parsed.success) toast.error(ta(parsed.message));
    else {
      let pkgId = fileInputRef.current?.getAttribute("data-pkg-id");

      // Check if package already exists
      if (!pkgId) {
        const found = db.packages.data.find((pkg) => pkg.name === parsed.data.name);
        if (found && confirm(ta("Package with same name already exists, do you want to replace it?"))) pkgId = found.id;
      }

      // Update or add the package
      if (pkgId) {
        const res = db.packages.update(pkgId, parsed.data);
        if (res.success) {
          toast.success(ta("Package updated successfully"));
          navigate(`/packages/${pkgId}`);
        } else toast.error(ta(res.message));
      } else {
        const res = db.packages.add(parsed.data);
        toast.success(ta("Package imported successfully"));
        navigate(`/packages/${res.id}`);
      }
    }

    fileInputRef.current?.removeAttribute("data-pkg-id");
    event.target.value = "";
  }

  return (
    <label htmlFor={fileInputID}>
      <input
        ref={fileInputRef}
        id={fileInputID}
        onChange={handleImport}
        type="file"
        accept="application/json"
        className="hidden"
      />
    </label>
  );
}
