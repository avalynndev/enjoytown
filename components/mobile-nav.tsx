'use client';
import React from 'react';
import Link from 'next/link';
import {
  Home,
  Search,
  Film,
  Tv2 as Tv,
  BookOpen,
  Monitor,
  Settings,
  Grid,
  X,
  Antenna,
  List,
} from 'lucide-react';
import { Button } from './ui/button';

const NavItem = ({ icon, label, to }: { icon: React.ReactNode; label: string; to: string }) => (
  <Link href={to} className="flex flex-col items-center justify-center">
    <div className="p-1">{icon}</div>
    <span className="mt-1 text-[10px]">{label}</span>
  </Link>
);

export const MobileNavBar = () => {
  const [showFullMenu, setShowFullMenu] = React.useState(false);
  const toggleFullMenu = () => setShowFullMenu(!showFullMenu);

  const fullMenuItems = [
    { icon: <Film size={24} />, label: 'Movies', to: '/movie' },
    { icon: <Tv size={24} />, label: 'TV Shows', to: '/tv' },
    { icon: <Monitor size={24} />, label: 'K-Drama', to: '/drama' },
    { icon: <Antenna size={24} />, label: 'Anime', to: '/anime' },
    { icon: <BookOpen size={24} />, label: 'Manga', to: '/manga' },
    { icon: <List size={24} />, label: 'List', to: '/list' },
    { icon: <Settings size={24} />, label: 'Settings', to: '/settings' },
  ];

  return (
    <>
      {showFullMenu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 dark:bg-black/90">
          <div className="absolute top-5 right-5">
            <Button size="icon" onClick={toggleFullMenu} className="p-2">
              <X />
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-8 p-4">
            {fullMenuItems.map(({ icon, label, to }) => (
              <Link
                key={label}
                href={to}
                onClick={toggleFullMenu}
                className="flex aspect-square flex-col items-center justify-center rounded-lg bg-white p-4 dark:bg-[#181818]"
              >
                {icon}
                <span className="mt-2 text-sm">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="fixed right-0 bottom-0 left-0 z-40 border-t bg-gray-100 lg:hidden dark:border-gray-800 dark:bg-[#121212]">
        <div className="flex items-center justify-around px-2 py-3">
          <NavItem icon={<Home size={20} />} label="Home" to="/" />
          <NavItem icon={<Search size={20} />} label="Search" to="/search" />
          <div className="relative flex flex-col items-center">
            <button
              onClick={toggleFullMenu}
              className="-mt-6 flex h-12 w-12 items-center justify-center rounded-full border-4 border-[#121212] bg-white dark:bg-black"
            >
              <Grid size={22} />
            </button>
            <span className="mt-1 text-[10px]">Menu</span>
          </div>
          <NavItem icon={<Film size={20} />} label="History" to="/history" />
          <NavItem icon={<Tv size={20} />} label="Watch List" to="/watchlist" />
        </div>
      </div>
    </>
  );
};
