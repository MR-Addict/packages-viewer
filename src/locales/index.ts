import { GroupedTranslationType } from "@/types/locale";

import { appTranslations } from "./app";
import { apiTranslations } from "./api";
import { homeTranslations } from "./home";
import { timeTranslations } from "./time";
import { packagesTranslations } from "./packages";
import { settingsTranslations } from "./settings";
import { packageTranslations } from "./package";

const locales: GroupedTranslationType = {
  app: appTranslations,
  home: homeTranslations,
  packages: packagesTranslations,
  package: packageTranslations,
  settings: settingsTranslations,
  time: timeTranslations,
  api: apiTranslations
};

export default locales;
