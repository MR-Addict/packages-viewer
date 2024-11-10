import { appName } from "@/data/app";
import { TranslationType } from "@/types/locale";

export const appTranslations: TranslationType[] = [
  {
    label: appName.name,
    data: {
      en: appName.name,
      zh: appName.nameZh
    }
  }
];
