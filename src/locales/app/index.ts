import { appName } from "@/data/app";
import { TranslationType } from "@/types/locale";

export const appTranslations: TranslationType[] = [
  {
    label: appName.name,
    data: {
      en: appName.name,
      zh: appName.nameZh
    }
  },
  {
    label: "Home",
    data: {
      en: "Home",
      zh: "首页"
    }
  },
  {
    label: "Packages",
    data: {
      en: "Packages",
      zh: "依赖"
    }
  },
  {
    label: "Settings",
    data: {
      en: "Settings",
      zh: "设置"
    }
  }
];
