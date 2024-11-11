import { locales } from "@/data/app";

export type LocaleType = (typeof locales)[number];
export type TranslationType = { label: string; data: Record<LocaleType, string> };
export type GroupedTranslationType = { [key in LocaleScopeType]: TranslationType[] };
export type LocaleScopeType = "app" | "home" | "packages" | "package" | "settings" | "time" | "api";
