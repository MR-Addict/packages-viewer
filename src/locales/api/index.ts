import { TranslationType } from "@/types/locale";

export const apiTranslations: TranslationType[] = [
  {
    label: "Package not exists",
    data: {
      en: "Package not exists",
      zh: "依赖不存在"
    }
  },
  {
    label: "Failed to fetch package",
    data: {
      en: "Failed to fetch package",
      zh: "依赖获取失败"
    }
  },
  {
    label: "Unable to parse your package",
    data: {
      en: "Unable to parse your package",
      zh: "依赖解析失败"
    }
  },
  {
    label: "Package updated successfully",
    data: {
      en: "Package updated successfully",
      zh: "依赖更新成功"
    }
  },
  {
    label: "Package imported successfully",
    data: {
      en: "Package imported successfully",
      zh: "依赖导入成功"
    }
  },
  {
    label: "There is no dependencies in your package",
    data: {
      en: "There is no dependencies in your package",
      zh: "依赖为空"
    }
  },
  {
    label: "Clipboard API not available",
    data: {
      en: "Clipboard API not available",
      zh: "剪贴板 API 不可用"
    }
  }
];
