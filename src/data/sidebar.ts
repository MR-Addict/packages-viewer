import { TbSettings } from "react-icons/tb";
import { LuLayoutGrid } from "react-icons/lu";

import { SidebarItem } from "@/types/sidebar";

export const sidebar: SidebarItem[] = [
  {
    title: "page.home",
    Icon: LuLayoutGrid,
    to: "/"
  },
  {
    title: "page.settings",
    Icon: TbSettings,
    to: "/settings"
  }
];
