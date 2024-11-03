import { Icons } from '@/components/common/icons';
import { Genre } from '@/lib/tmdb/utils/common';

export interface AnimeShow {
  id: string;
  malId: number;
  title: {
    romaji: string;
    english: string;
    native: string;
    userPreferred: string;
  };
  image: string;
  trailer: {
    id: string;
    site: string;
    thumbnail: string;
    thumbnailHash: string;
  };
  description: string;
  status: string;
  cover: string;
  rating: number;
  releaseDate: number;
  color: string;
  genres: string[];
  totalEpisodes: number;
  duration: number;
  type: string;
}

export interface Show {
  id: number;
  poster_path: string;
  overview: string;
  genre_ids: number[];
  original_language: string;
  popularity: number;
  vote_count: number;
  vote_average: number;
  backdrop_path?: string;
  // Movie-specific properties
  adult?: boolean;
  video?: boolean;
  title?: string;
  original_title?: string;
  release_date?: string;
  // TvSerie-specific properties
  name?: string;
  original_name?: string;
  first_air_date?: string;
  origin_country?: string[];
  genres?: Genre[];
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
