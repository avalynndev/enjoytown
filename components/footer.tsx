import Link from "next/link";
import Image from 'next/image'
import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { Clapperboard } from "lucide-react";

const INTERESTELAR_ID = "157336";

export const Footer = () => {
  return (
    <div className="mx-auto max-w-6xl overflow-hidden rounded-lg shadow-sm lg:mb-4 lg:border">
      <Link href={`/movie/${INTERESTELAR_ID}`}>
        <div className="relative aspect-video h-[300px] w-full overflow-hidden md:aspect-auto">
          <div
            className={
              "h-[30dvh] w-full overflow-hidden border bg-muted shadow md:rounded-lg lg:h-[55dvh] max-h-[20vh] md:max-h-[50vh]"
            }
          >
            <div
              style={{
                backgroundImage: `url('/image.jpeg')`,
                backgroundSize: "cover",
                backgroundPosition: "right 50% top 30%",
              }}
              className="h-full w-full brightness-50"
              data-testid="banner"
            />
          </div>
        </div>
      </Link>
      <div
        className="
          mx-auto grid max-w-6xl grid-cols-1 gap-2 border-t leading-7 
          md:grid-cols-3
          [&_h5]:text-lg [&_h5]:font-medium 
          [&_li.disabled]:cursor-not-allowed [&_li.disabled]:opacity-50
          [&_li]:text-muted-foreground 
          [&_section]:space-y-2 [&_section]:p-4 
          [&_ul]:space-y-1 [&_ul]:text-sm [&_ul]:leading-7
        "
      >
        <section className="border-b md:border-b-0 md:border-r ">
          <h5>About Us</h5>

          <ul>
            <li>
              <Link href={`/features`}>Features</Link>
            </li>

            <li className="disabled">download</li>
          </ul>
        </section>

        <section className="border-b md:border-b-0 md:border-r">
          <h5>community</h5>

          <ul>
            <li>
              <Link href="https://github.com/plotwist-app/plotwist">
                Github
              </Link>
            </li>

            <li>
              <Link href="https://discord.gg/5E38RcG8xj">Discord</Link>
            </li>

            <li className="disabled">Careers</li>
            <li className="disabled">Brand</li>
          </ul>
        </section>

        <section className="">
          <h5>asd</h5>

          <ul>
            <li className="disabled">privacy_policy</li>
            <li className="disabled">terms_of_service</li>
          </ul>
        </section>
      </div>

      <div className="border-t p-4">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-0">
          <div className="flex items-center gap-2">
            <Clapperboard size={20} />
            <h2 className="text-md font-normal">Enjoytown</h2>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-xs text-muted-foreground">© 2024 avalynndev</p>

            <div className="h-3 border-r" />

            <span className=" text-xs text-muted-foreground">
              Data provided by Consumet and Tmdb API
            </span>
          </div>

          <div className="flex items-center gap-2 [&_a>svg]:fill-foreground [&_a>svg]:stroke-background [&_a]:rounded-full [&_a]:border [&_a]:px-3 [&_a]:py-1 [&_a]:shadow">
            <Link href="https://github.com/avalynndev/enjoytown">
              <GitHubLogoIcon />
            </Link>

            <Link href="https://x.com/avalynndev">
              <TwitterLogoIcon />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
