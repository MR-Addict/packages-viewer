import { GroupedTranslationType } from "@/types/locale";

import { appTranslations } from "./app";
import { homeTranslations } from "./home";
import { timeTranslations } from "./time";
import { packageTranslations } from "./package";
import { sidebarTranslations } from "./sidebar";
import { settingsTranslations } from "./settings";
import { packageDetailTranslations } from "./packageDetail";

const locales: GroupedTranslationType = {
  app: appTranslations,
  home: homeTranslations,
  package: packageTranslations,
  packageDetail: packageDetailTranslations,
  settings: settingsTranslations,
  sidebar: sidebarTranslations,
  time: timeTranslations
};

export default locales;
