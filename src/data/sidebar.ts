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
    title: "Collection",
    Icon: HiOutlineCollection,
    to: "/collection"
  },
  {
    title: "Settings",
    Icon: TbSettings,
    to: "/settings"
  }
];
