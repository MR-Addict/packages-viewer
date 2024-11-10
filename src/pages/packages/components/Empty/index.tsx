import { useLocaleContext } from "@/contexts/locale";

export default function Empty() {
  const { t } = useLocaleContext();

  return (
    <p className="flex-1 w-full grid place-content-center">{t("You haven't upload any packages yet!", "package")}</p>
  );
}
