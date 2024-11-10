import t from "@/hooks/useLocaleTranslation";

export default function Empty() {
  return <p className="flex-1 w-full grid place-content-center">{t("You haven't upload any packages yet!")}</p>;
}
