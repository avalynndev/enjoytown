export const url = {
  popular: "https://animetize-api.vercel.app/popular",
  top_airing: "https://animetize-api.vercel.app/top-airing",
  info: "https://animetize-api.vercel.app/info/",
  episode_link: "https://animetize-api.vercel.app/watch/",
  movies: "https://animetize-api.vercel.app/movies",
  recent_episodes: "https://animetize-api.vercel.app/recent-episodes",
  anime_list: "https://animetize-api.vercel.app/anime-list",
  search: "https://animetize-api.vercel.app/",
  genre: "https://animetize-api.vercel.app/genre",
};

export const API_KEY =  `${process.env.TMDB_API_KEY}`;
export const PROXY = process.env.TMDB_PROXY_URL ? `${process.env.TMDB_PROXY_URL}/fetch?url=` : '';

export const Tv_NowPlaying = `${PROXY}https://api.themoviedb.org/3/tv/now_playing?api_key=${API_KEY}`;
export const Movie_Search = `${PROXY}https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
export const Tv_Search = `${PROXY}https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=`;

export const getInfoURL = (movieId: any) =>
  `${PROXY}https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
export const getTVInfoURL = (TVId: any) =>
  `${PROXY}https://api.themoviedb.org/3/tv/${TVId}?api_key=${API_KEY}`;
