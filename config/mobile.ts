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
  ],
  sidebarNav: [
    {
      title: "K-drama",
      href: "/kdrama",
      items: [
        {
          title: "Search",
          href: "/kdrama/search",
          items: [],
        },
      ],
    },
    
    {
      title: "Movie",
      href: "/movie",
      items: [
        {
          title: "Search",
          href: "/movie/search",
          items: [],
        },
      ],
    },
    
  ],
};
