export type LocaleType = "zh" | "en";
export type TranslationType = { label: string; data: Record<LocaleType, string> };
export type GroupedTranslationType = { [key in LocaleScopeType]: TranslationType[] };
export type LocaleScopeType = "app" | "home" | "packages" | "package" | "settings" | "time" | "api";
