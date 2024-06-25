import { cn } from "@/lib/utils";
import {
  ListChecks,
  LucideIcon,
  MessageSquare,
  Globe as GlobeLucide,
  Users,
} from "lucide-react";
import Image from "next/image";
import { ComponentProps, PropsWithChildren } from "react";


type HomeFeatureProps = {
  icon: LucideIcon;
  title: string;
  description: string;
} & ComponentProps<"li"> &
  PropsWithChildren;

const HomeFeature = ({
  icon: Icon,
  title,
  description,
  className,
  children,
  ...props
}: HomeFeatureProps) => {
  return (
    <li
      className={cn(
        "flex flex-col space-y-4 rounded-lg border bg-background bg-gradient-to-b from-transparent to-muted/30 p-6",
        className
      )}
      {...props}
    >
      <div className="space-y-1">
        <div className="flex items-center gap-4">
          <Icon className="h-6 w-6 text-muted-foreground" />
          <span className="text-lg font-semibold">{title}</span>
        </div>

        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="pointer-events-none relative flex h-full w-full select-none items-center justify-center overflow-hidden rounded-lg border text-muted-foreground shadow">
        {children}
      </div>
    </li>
  );
};

export const HomeFeatures = () => {

  return (
    <section className="py-8" id="features">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col items-center space-y-2">
          <h2 className="text-2xl font-bold">Enjoytown Features</h2>
          <p className="w-2/3 text-center text-muted-foreground">
            Enjoytown is for cinema fans who like to explore millions of movies
            and series, with information such as synopsis, cast, budget, and
            much more.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-3 lg:p-0">
          <HomeFeature
            title={"Lists"}
            description={
              "Create and manage the status of your movies, series, and animes in one beautiful place."
            }
            className="col-span-1 aspect-[16/9] lg:col-span-2"
            icon={ListChecks}
          >
            <span className="animate-pulse">Work in progress...</span>
          </HomeFeature>

          <HomeFeature
            icon={MessageSquare}
            title={"Reviews"}
            description={
              "Write reviews about what you're watching and let the world know your opinion."
            }
            className="col-span-1"
          >
            <span className="animate-pulse">Work in progress...</span>
          </HomeFeature>

          <HomeFeature
            icon={GlobeLucide}
            title={"Multi-language Support"}
            description={
              "We support different languages to bring together different countries."
            }
            className="col-span-1"
          >
            <span className="animate-pulse">Work in progress...</span>
          </HomeFeature>

          <HomeFeature
            icon={Users}
            title={"Communities"}
            description={"Create or participate in specific niche communities."}
            className="col-span-1  aspect-[16/9] lg:col-span-2"
          >
            <span className="animate-pulse">Work in progress...</span>
          </HomeFeature>
        </ul>
      </div>
    </section>
  );
};
