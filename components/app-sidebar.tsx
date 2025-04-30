'use client';

import * as React from 'react';
import {
  IconCamera,
  IconClock,
  IconDeviceTvOld,
  IconHeart,
  IconSettings,
} from '@tabler/icons-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { NavSecondary } from '@/components/nav-secondary';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarRail,
  SidebarMenuItem,
  useSidebar,
  SidebarGroup,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import {
  Antenna,
  Book,
  ChevronRight,
  Clapperboard,
  Handshake,
  List,
  Monitor,
  Tv,
  Tv2,
} from 'lucide-react';
import Link from 'next/link';

const data = {
  user: {
    name: 'avalynndev',
    email: 'm@example.com',
    avatar: '/avalynndev.png',
  },
  navMain: [
    {
      title: 'Movie',
      url: '/movie',
      icon: Tv2,
    },
    {
      title: 'Tv Shows',
      url: '/tv',
      icon: IconDeviceTvOld,
    },
    {
      title: 'Anime',
      url: '/anime',
      icon: Antenna,
    },
    {
      title: 'Drama',
      url: '/drama',
      icon: Tv,
    },
    {
      title: 'Manga',
      url: '/manga',
      icon: Book,
    },
  ],
  navClouds: [
    {
      title: 'List',
      icon: List,
      isActive: true,
      items: [
        {
          title: 'Movie/TV',
          url: '/list/mtv',
        },
        {
          title: 'Anime',
          url: '/list/anime',
        },
      ],
    },
    {
      title: 'Partners',
      icon: Handshake,
      isActive: true,
      items: [
        {
          title: '1Anime',
          url: 'https://1anime.app/',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'History',
      url: '/history',
      icon: IconClock,
    },
    {
      title: 'Watchlist',
      url: '/watchlist',
      icon: IconHeart,
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: IconSettings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  return (
    <Sidebar collapsible="icon" {...props} className="bg-gray-100 dark:bg-black">
      <SidebarHeader className="mr-1 mb-3 rounded-xl bg-white dark:bg-[#121212]">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link href="/">
                <Clapperboard className="pl-0.5 group-data-[collapsible=icon]:size-6" />
                {state === 'collapsed' ? (
                  <></>
                ) : (
                  <span className="text-base font-semibold">Enjoytown</span>
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="mr-1 mb-3 rounded-xl bg-white dark:bg-[#121212]">
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.url}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Alternative Sources</SidebarGroupLabel>
          <SidebarMenu>
            {data.navClouds.map((item) => (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="mr-1 rounded-xl bg-white dark:bg-[#121212]">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
