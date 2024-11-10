import { Locale } from "@/types/app";

type Translation = { label: string; translations: Record<Locale, string> };

const app: Translation[] = [
  {
    label: "Packages Viewer",
    translations: {
      en: "Packages Viewer",
      zh: "依赖查看器"
    }
  },
  {
    label: "second",
    translations: {
      en: "second",
      zh: "秒"
    }
  },
  {
    label: "seconds",
    translations: {
      en: "seconds",
      zh: "秒"
    }
  },
  {
    label: "minute",
    translations: {
      en: "minute",
      zh: "分钟"
    }
  },
  {
    label: "minutes",
    translations: {
      en: "minutes",
      zh: "分钟"
    }
  },
  {
    label: "hour",
    translations: {
      en: "hour",
      zh: "小时"
    }
  },
  {
    label: "hours",
    translations: {
      en: "hours",
      zh: "小时"
    }
  },
  {
    label: "day",
    translations: {
      en: "day",
      zh: "天"
    }
  },
  {
    label: "days",
    translations: {
      en: "days",
      zh: "天"
    }
  },
  {
    label: "week",
    translations: {
      en: "week",
      zh: "周"
    }
  },
  {
    label: "weeks",
    translations: {
      en: "weeks",
      zh: "周"
    }
  },
  {
    label: "month",
    translations: {
      en: "month",
      zh: "月"
    }
  },
  {
    label: "months",
    translations: {
      en: "months",
      zh: "月"
    }
  },
  {
    label: "year",
    translations: {
      en: "year",
      zh: "年"
    }
  },
  {
    label: "years",
    translations: {
      en: "years",
      zh: "年"
    }
  },
  {
    label: "ago",
    translations: {
      en: "ago",
      zh: "前"
    }
  },
  {
    label: "later",
    translations: {
      en: "later",
      zh: "后"
    }
  },
  {
    label: "just now",
    translations: {
      en: "just now",
      zh: "刚刚"
    }
  },
  {
    label: "last",
    translations: {
      en: "last",
      zh: "上一"
    }
  },
  {
    label: "next",
    translations: {
      en: "last",
      zh: "下一"
    }
  }
];

const componentsSidebar: Translation[] = [
  {
    label: "Home",
    translations: {
      en: "Home",
      zh: "首页"
    }
  },
  {
    label: "Packages",
    translations: {
      en: "Packages",
      zh: "依赖"
    }
  },
  {
    label: "Settings",
    translations: {
      en: "Settings",
      zh: "设置"
    }
  },
  {
    label: "Created by",
    translations: {
      en: "Created by",
      zh: "作者"
    }
  }
];

const pageHome: Translation[] = [
  {
    label: "Click or drag your",
    translations: {
      en: "Click or drag your",
      zh: "点击或拖拽你的"
    }
  },
  {
    label: "here",
    translations: {
      en: "here",
      zh: "到此处"
    }
  },
  {
    label: "Failed to import package",
    translations: {
      en: "Failed to import package",
      zh: "无法导入依赖"
    }
  },
  {
    label: "Package updated successfully",
    translations: {
      en: "Package updated successfully",
      zh: "依赖更新成功"
    }
  },
  {
    label: "Package imported successfully",
    translations: {
      en: "Package imported successfully",
      zh: "依赖导入成功"
    }
  }
];

const pagePackages: Translation[] = [
  {
    label: "Search",
    translations: {
      en: "Search",
      zh: "搜索依赖"
    }
  },
  {
    label: "You haven't upload any packages yet!",
    translations: {
      en: "You haven't upload any packages yet!",
      zh: "您还没有上传任何包！"
    }
  },
  {
    label: "name",
    translations: {
      en: "name",
      zh: "名称"
    }
  },
  {
    label: "uploaded",
    translations: {
      en: "uploaded",
      zh: "上传时间"
    }
  },
  {
    label: "dependencies",
    translations: {
      en: "dependencies",
      zh: "依赖个数"
    }
  },
  {
    label: "There're total",
    translations: {
      en: "here're total",
      zh: "共有"
    }
  },
  {
    label: " dependencies",
    translations: {
      en: " dependencies",
      zh: "个依赖"
    }
  },
  {
    label: "Are you sure you want to delete this package?",
    translations: {
      en: "Are you sure you want to delete this package?",
      zh: "确认删除该依赖"
    }
  },
  {
    label: "Enter new name for this package",
    translations: {
      en: "Enter new name for this package",
      zh: "输入新的名称"
    }
  }
];

const pagePackage: Translation[] = [
  {
    label: "Upload",
    translations: {
      en: "Upload",
      zh: "上传"
    }
  },
  {
    label: "Select",
    translations: {
      en: "Select",
      zh: "选择"
    }
  },
  {
    label: "Updatable",
    translations: {
      en: "Updatable",
      zh: "可更新"
    }
  },
  {
    label: "Production",
    translations: {
      en: "Production",
      zh: "生产依赖"
    }
  },
  {
    label: "Development",
    translations: {
      en: "Development",
      zh: "开发依赖"
    }
  },
  {
    label: "Copy",
    translations: {
      en: "Copy",
      zh: "复制"
    }
  },
  {
    label: "Latest",
    translations: {
      en: "Latest",
      zh: "最新"
    }
  },
  {
    label: "Original",
    translations: {
      en: "Original",
      zh: "原始"
    }
  },
  {
    label: "No dependencies selected",
    translations: {
      en: "No dependencies selected",
      zh: "未选择任何依赖"
    }
  },
  {
    label: "Copied to clipboard",
    translations: {
      en: "Copied to clipboard",
      zh: "已复制到剪贴板"
    }
  }
];

const pageSettings: Translation[] = [
  {
    label: "Theme",
    translations: {
      en: "Theme",
      zh: "主题"
    }
  },
  {
    label: "light",
    translations: {
      en: "light",
      zh: "亮色"
    }
  },
  {
    label: "dark",
    translations: {
      en: "dark",
      zh: "暗色"
    }
  },
  {
    label: "system",
    translations: {
      en: "system",
      zh: "系统"
    }
  },
  {
    label: "Language",
    translations: {
      en: "Language",
      zh: "语言"
    }
  },
  {
    label: "Change the appearance of the app",
    translations: {
      en: "Change the appearance of the app",
      zh: "更改应用程序的外观"
    }
  },
  {
    label: "English",
    translations: {
      en: "English",
      zh: "英文"
    }
  },
  {
    label: "Chinese",
    translations: {
      en: "Chinese",
      zh: "中文"
    }
  },
  {
    label: "Change the language of the app",
    translations: {
      en: "Change the language of the app",
      zh: "更改应用程序的语言"
    }
  },
  {
    label: "Package Manager",
    translations: {
      en: "Package Manager",
      zh: "包管理器"
    }
  },
  {
    label: "Choose the package manager you use",
    translations: {
      en: "Choose the package manager you use",
      zh: "选择您使用的包管理器"
    }
  },
  {
    label: "App Version",
    translations: {
      en: "App Version",
      zh: "应用版本"
    }
  },
  {
    label: "Current app version",
    translations: {
      en: "Current app version",
      zh: "当前应用版本"
    }
  },
  {
    label: "Clear",
    translations: {
      en: "Clear",
      zh: "清除"
    }
  },
  {
    label: "Clear Storage",
    translations: {
      en: "Clear Storage",
      zh: "清除缓存"
    }
  },
  {
    label: "Clear all the data stored in the app",
    translations: {
      en: "Clear all the data stored in the app",
      zh: "清除应用程序中存储的所有数据"
    }
  },
  {
    label: "Are you sure you want to clear all the data?",
    translations: {
      en: "Are you sure you want to clear all the data?",
      zh: "您确定要清除所有数据吗？"
    }
  }
];

export const translations = app.concat(componentsSidebar, pageHome, pagePackages, pagePackage, pageSettings);
