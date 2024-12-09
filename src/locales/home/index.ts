import { TranslationType } from "@/types/locale";

export const homeTranslations: TranslationType[] = [
  {
    label: "input.search",
    data: {
      en: "Search",
      zh: "搜索项目",
      ja: "検索対象"
    }
  },
  {
    label: "orderby.name",
    data: {
      en: "name",
      zh: "名称",
      ja: "名前"
    }
  },
  {
    label: "orderby.uploaded",
    data: {
      en: "uploaded",
      zh: "上传时间",
      ja: "アップロード日"
    }
  },
  {
    label: "orderby.dependencies",
    data: {
      en: "dependencies",
      zh: "依赖个数",
      ja: "依存関係"
    }
  },
  {
    label: "label.dependencies.total",
    data: {
      en: "There're total {total} dependencies",
      zh: "共有{total}个依赖",
      ja: "合計{total}の依存関係"
    }
  },
  {
    label: "button.edit",
    data: {
      en: "Edit",
      zh: "编辑",
      ja: "編集"
    }
  },
  {
    label: "button.delete",
    data: {
      en: "Delete",
      zh: "删除",
      ja: "削除"
    }
  },
  {
    label: "button.add",
    data: {
      en: "Add",
      zh: "添加",
      ja: "追加"
    }
  },
  {
    label: "label.package.update",
    data: {
      en: "Enter new name for this package",
      zh: "输入新的名称",
      ja: "このパッケージの新しい名前を入力してください"
    }
  },
  {
    label: "label.package.delete",
    data: {
      en: "Are you sure you want to delete this package?",
      zh: "确认删除该依赖",
      ja: "このパッケージを削除してもよろしいですか？"
    }
  }
];
