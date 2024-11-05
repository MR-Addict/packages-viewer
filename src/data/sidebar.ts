import { TbSettings } from "react-icons/tb";
import { LuLayoutGrid } from "react-icons/lu";
import { HiOutlineCollection } from "react-icons/hi";

import { SidebarItem } from "@/types/sidebar";

export const sidebar: SidebarItem[] = [
  {
    title: "Home",
    Icon: LuLayoutGrid,
    to: "/"
  },
  {
    title: "Packages",
    Icon: HiOutlineCollection,
    to: "/packages"
  },
  {
    title: "Settings",
    Icon: TbSettings,
    to: "/settings"
  }
];
