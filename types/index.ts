import { Icons } from "@/components/common/icons";

export interface Show {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  original_name: string;
  name: string;
  genres: any;
  tagline: string;
  media_type: string;
  overview: string;
  popularity: number;
  first_air_date: string;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  origin_country?: string[];
  status?: string;
  last_air_date?: string;
  number_of_seasons?: number;
  number_of_episodes?: number;
  runtime?: number;
  budget?: number;
  revenue?: number;
  spoken_languages: any;
}

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
