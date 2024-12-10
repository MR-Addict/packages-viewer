import { appName } from "@/data/app";
import { TranslationType } from "@/types/locale";

export const rootTranslations: TranslationType[] = [
  {
    label: appName.id,
    data: {
      en: appName.name,
      zh: "依赖查看器",
      ja: "パッケージビューアー"
    }
  },
  {
    label: "page.home",
    data: {
      en: "Home",
      zh: "首页",
      ja: "ホーム"
    }
  },
  {
    label: "page.settings",
    data: {
      en: "Settings",
      zh: "设置",
      ja: "設定"
    }
  },
  {
    label: "packages",
    data: {
      en: "Packages",
      zh: "依赖",
      ja: "パッケージ"
    }
  }
];
