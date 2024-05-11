import { Icons } from "@/components/icons";

export interface data_types {
  title: string;
  image: string;
  episode_number: number;
  type: string;
}

export interface Anime {
  id: number;
  title: string;
}

export interface EpisodeDetails {
  id: number;
  title: string;
}

export interface WatchDataSources {
  url: string;
  isM3U8: boolean;
  quality: string;
}

export interface WatchData {
  sources: {
    url: string;
  }[];
}

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface MainNavItem extends NavItem {}

export interface SidebarNavItem extends NavItemWithChildren {}

export interface MainNavProps {
  items?: NavItem[];
}

export interface DramaInfo {
  episodes: {
    id: string;
    title: string;
    episode: number;
    subType: string;
    releaseDate: string;
    url: string;
  }[];
}
