import { langs } from "@/data/app";

export type Lang = (typeof langs)[number];
export type TranslationType = { label: string; data: Record<Lang, string> };
export type GroupedTranslationType = { [key in LocaleScopeType]: TranslationType[] };
export type LocaleScopeType = "root" | "home" | "package" | "settings" | "time" | "api";
