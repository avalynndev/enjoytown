'use client';

import { useEffect, useState } from 'react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IconDotsVertical, IconLogout } from '@tabler/icons-react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';

type User = {
  name: string;
  email: string;
  image?: string;
};

export function NavUserClient() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch('/api/auth/session');
      const data = await res.json();
      setUser(data.user);
    };

    fetchSession();
  }, []);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.image ?? ''} alt={user.name ?? 'User'} />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
                <div className="text-left text-sm leading-tight">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-muted-foreground text-xs">{user.email}</span>
                </div>
                <IconDotsVertical className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => authClient.signOut()}>
                <IconLogout />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/sign-in">
            <SidebarMenuButton className="text-sm font-medium text-blue-600 hover:underline">
              Login
            </SidebarMenuButton>
          </Link>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
