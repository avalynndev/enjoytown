export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "EnjoyTown",
  description:
    "Beautifully designed website where you can watch kdrama for free. Built with Next.JS and shadcn/ui.",
  mainNav: [
    {
      title: "K-drama",
      href: "/kdrama",
    },
    {
      title: "Movie",
      href: "/movie",
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
  links: {
    twitter: "https://twitter.com/avalynndev",
    github: "https://github.com/avalynndev/enjoytown-web",
    enjoytown: "/",
  },
};
