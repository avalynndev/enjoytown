'use client';
import React from 'react';
import Link from 'next/link';
import {
  Home,
  Search,
  Film,
  Tv2 as Tv,
  BookOpen,
  MonitorSmartphone,
  Settings,
  Grid,
} from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
}

const NavItem = ({ icon, label, to }: NavItemProps) => {
  return (
    <Link href={to} className="flex flex-col items-center justify-center text-white">
      <div className="p-1">{icon}</div>
      <span className="mt-1 text-[10px]">{label}</span>
    </Link>
  );
};

export const MobileNavBar = () => {
  const [showFullMenu, setShowFullMenu] = React.useState(false);

  const toggleFullMenu = () => {
    setShowFullMenu(!showFullMenu);
  };

  return (
    <>
      {/* Full Menu Overlay */}
      {showFullMenu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <div className="absolute top-5 right-5">
            <button onClick={toggleFullMenu} className="p-2 text-white">
              Close
            </button>
          </div>

          <div className="grid grid-cols-3 gap-8 p-4">
            <div className="flex aspect-square flex-col items-center justify-center rounded-lg bg-[#181818] p-4">
              <Film size={24} className="mb-2" />
              <span className="text-sm text-white">Movies</span>
            </div>
            <div className="flex aspect-square flex-col items-center justify-center rounded-lg bg-[#181818] p-4">
              <Tv size={24} className="mb-2" />
              <span className="text-sm text-white">TV Shows</span>
            </div>
            <div className="flex aspect-square flex-col items-center justify-center rounded-lg bg-[#181818] p-4">
              <BookOpen size={24} className="mb-2" />
              <span className="text-sm text-white">K-Drama</span>
            </div>
            <div className="flex aspect-square flex-col items-center justify-center rounded-lg bg-[#181818] p-4">
              <BookOpen size={24} className="mb-2" />
              <span className="text-sm text-white">Anime</span>
            </div>
            <div className="flex aspect-square flex-col items-center justify-center rounded-lg bg-[#181818] p-4">
              <BookOpen size={24} className="mb-2" />
              <span className="text-sm text-white">Manga</span>
            </div>
            <div className="flex aspect-square flex-col items-center justify-center rounded-lg bg-[#181818] p-4">
              <MonitorSmartphone size={24} className="mb-2" />
              <span className="text-sm text-white">Live TV</span>
            </div>
            <div className="flex aspect-square flex-col items-center justify-center rounded-lg bg-[#181818] p-4">
              <Settings size={24} className="mb-2" />
              <span className="text-sm text-white">Settings</span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Fixed Navigation */}
      <div className="fixed right-0 bottom-0 left-0 z-40 border-t border-gray-800 bg-[#121212] md:hidden">
        <div className="flex items-center justify-around px-2 py-3">
          <NavItem icon={<Home size={20} />} label="Home" to="/" />
          <NavItem icon={<Search size={20} />} label="Search" to="/search" />
          <div className="relative flex flex-col items-center">
            <button
              onClick={toggleFullMenu}
              className="bg-moviemaze-star -mt-6 flex h-12 w-12 items-center justify-center rounded-full border-4 border-[#121212]"
            >
              <Grid size={22} />
            </button>
            <span className="mt-1 text-[10px]">Menu</span>
          </div>
          <NavItem icon={<Film size={20} />} label="Movies" to="/movies" />
          <NavItem icon={<Tv size={20} />} label="TV" to="/tv-shows" />
        </div>
      </div>
    </>
  );
};
