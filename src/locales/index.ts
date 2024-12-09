import { GroupedTranslationType } from "@/types/locale";

import { rootTranslations } from "./root";
import { apiTranslations } from "./api";
import { timeTranslations } from "./time";

import { homeTranslations } from "./home";
import { packageTranslations } from "./package";
import { settingsTranslations } from "./settings";

const locales: GroupedTranslationType = {
  root: rootTranslations,
  home: homeTranslations,
  package: packageTranslations,
  settings: settingsTranslations,
  time: timeTranslations,
  api: apiTranslations
};

export default locales;
