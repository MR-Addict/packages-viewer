import { themes } from "@/data/app";

export type ThemeType = (typeof themes)[number];

export type ApiResultType<T = undefined> =
  | ({
      readonly success: true;
    } & (T extends undefined ? {} : { readonly data: NonNullable<T> }))
  | {
      readonly success: false;
      readonly message: string;
    };
