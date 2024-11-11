import { appName } from "@/data/app";
import { TranslationType } from "@/types/locale";

export const appTranslations: TranslationType[] = [
  {
    label: appName.name,
    data: {
      en: appName.name,
      zh: "依赖查看器",
      ja: "パッケージビューアー"
    }
  },
  {
    label: "Home",
    data: {
      en: "Home",
      zh: "首页",
      ja: "ホーム"
    }
  },
  {
    label: "Packages",
    data: {
      en: "Packages",
      zh: "依赖",
      ja: "パッケージ"
    }
  },
  {
    label: "Settings",
    data: {
      en: "Settings",
      zh: "设置",
      ja: "設定"
    }
  }
];
