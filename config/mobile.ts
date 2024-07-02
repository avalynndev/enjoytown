import { MainNavItem, SidebarNavItem } from "@/types";

interface MobileConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const mobileConfig: MobileConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Anime",
      href: "/anime",
    },
    {
      title: "Manga",
      href: "/manga",
    },
    {
      title: "K-drama",
      href: "/kdrama",
    },
    {
      title: "Movie",
      href: "/movie",
    },
    {
      title: "TV",
      href: "/tv",
    },
  ],
  sidebarNav: [
    {
      title: "Other Features",
      items: [
        {
          title: "List",
          href: "/list",
          items: [],
        },
      ],
    },
  ],
};
