import { packagesOrderBys, themes } from "@/data/app";

export type OrderType = "asc" | "desc";
export type ThemeType = (typeof themes)[number];
export type PackagesOrderByType = (typeof packagesOrderBys)[number];

export type ApiResultType<T = undefined> =
  | ({
      readonly success: true;
    } & (T extends undefined ? {} : { readonly data: NonNullable<T> }))
  | {
      readonly success: false;
      readonly message: string;
    };
