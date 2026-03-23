'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Bell, Search, User } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
}

export function AdminHeader({ title }: AdminHeaderProps) {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-30 h-16 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
      <div className="flex items-center justify-between h-full px-6">
        {/* Title */}
        <h1 className="text-xl font-semibold text-white">{title}</h1>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/50 transition-colors"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
          </button>

          {/* User */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-purple-500 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-medium text-white">
                {session?.user?.name || 'Admin'}
              </p>
              <p className="text-xs text-gray-500">
                {session?.user?.role || 'Administrator'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
