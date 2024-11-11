import { useLocaleContext } from "@/contexts/locale";

export default function Empty() {
  const { translate } = useLocaleContext();

  return (
    <p className="flex-1 w-full grid place-content-center">
      {translate("You haven't upload any packages yet!", "packages")}
    </p>
  );
}
