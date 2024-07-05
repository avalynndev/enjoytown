"use client";
import {
  Clapperboard,
  Home,
  List,
  Book,
  Tv,
} from "lucide-react";
import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function MainNav() {
  return (
    <div className="mr-4 hidden xl:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Clapperboard className="h-6 w-6" />
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Home className="h-4 w-4" />
                  <div className="px-2"> Home </div>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Tv className="h-4 w-4" />
                <div className="px-2"> Watch </div>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[400px]">
                  <ListItem href="/movie" title="Movie">
                    Explore Movie Marvels: Spectacles Await You!
                  </ListItem>
                  <ListItem href="/tv" title="Tv Shows">
                    Live on TV Shows: Addiction await ≥
                  </ListItem>
                  <ListItem href="/drama" title="Drama">
                    Indulge in K Drama: Emotions Await!
                  </ListItem>
                  <ListItem href="/anime" title="Anime">
                    Dive into Anime Worlds: Adventures Await!
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/manga" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Book className="h-4 w-4" />
                  <div className="px-2"> Manga </div>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/list" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <List className="h-4 w-4" />
                  <div className="px-2"> List </div>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";
