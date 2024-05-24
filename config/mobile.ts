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
      title: "Search",
      items: [
        {
          title: "K-Drama Search",
          href: "/kdrama/search",
          items: [],
        },
        {
          title: "Movie Search",
          href: "/movie/search",
          items: [],
        },
      ],
    },
  ],
};
