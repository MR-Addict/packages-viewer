export type LocaleType = "zh" | "en";
export type TranslationType = { label: string; data: Record<LocaleType, string> };
export type LocaleScopeType = "app" | "home" | "package" | "packageDetail" | "settings" | "sidebar" | "time";
export type GroupedTranslationType = { [key in LocaleScopeType]: TranslationType[] };
