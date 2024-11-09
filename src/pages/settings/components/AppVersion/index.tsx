import toast from "react-hot-toast";

import pageStyle from "../../index.module.css";
import copyToClipboard from "@/lib/utils/copyToClipboard";

export default function AppVersion() {
  function handleClick() {
    const res = copyToClipboard(APP_VERSION);
    if (!res.success) toast.error(res.message);
    else toast.success("Copied to clipboard");
  }

  return (
    <section className={pageStyle.container}>
      <h1>App Version</h1>

      <p>Current app version</p>

      <button type="button" className={pageStyle.btn} onClick={handleClick}>
        {APP_VERSION}
      </button>
    </section>
  );
}
