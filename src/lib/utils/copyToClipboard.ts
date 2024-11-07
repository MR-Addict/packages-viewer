import { ApiResultType } from "@/types/app";

export default function copyToClipboard(text: string): ApiResultType {
  if (!navigator.clipboard) return { success: false, message: "Clipboard API not available" };
  else navigator.clipboard.writeText(text);
  return { success: true };
}
