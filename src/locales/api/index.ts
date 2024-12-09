import { TranslationType } from "@/types/locale";

export const apiTranslations: TranslationType[] = [
  {
    label: "db.package.none",
    data: {
      en: "Package not exists",
      zh: "依赖不存在",
      ja: "パッケージが存在しません"
    }
  },
  {
    label: "db.package.exists",
    data: {
      en: "Package with same name already exists, do you want to replace it?",
      zh: "同名依赖已存在，是否替换？",
      ja: "同じ名前のパッケージがすでに存在します。置き換えますか？"
    }
  },
  {
    label: "package.fetch.failed",
    data: {
      en: "Failed to fetch package",
      zh: "依赖获取失败",
      ja: "パッケージの取得に失敗しました"
    }
  },
  {
    label: "package.parse.failed",
    data: {
      en: "Unable to parse your package",
      zh: "依赖解析失败",
      ja: "パッケージを解析できません"
    }
  },
  {
    label: "package.update.success",
    data: {
      en: "Package updated successfully",
      zh: "依赖更新成功",
      ja: "パッケージが正常に更新されました"
    }
  },
  {
    label: "package.import.success",
    data: {
      en: "Package imported successfully",
      zh: "依赖导入成功",
      ja: "パッケージが正常にインポートされました"
    }
  },
  {
    label: "package.dependency.none",
    data: {
      en: "There is no dependencies in your package",
      zh: "依赖为空",
      ja: "パッケージに依存関係がありません"
    }
  },
  {
    label: "clipboard.unavailable",
    data: {
      en: "Clipboard API not available",
      zh: "剪贴板 API 不可用",
      ja: "クリップボード API は利用できません"
    }
  }
];
