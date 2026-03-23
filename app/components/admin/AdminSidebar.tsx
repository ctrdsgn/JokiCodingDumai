'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  Image,
  ShoppingCart,
  Settings,
  LogOut,
  DoorOpen,
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin/packages', label: 'Packages', icon: Package },
  { href: '/admin/portfolio', label: 'Portfolio', icon: Image },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 z-40 h-screen w-64 bg-gray-900 border-r border-gray-800"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 h-16 border-b border-gray-800">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-teal-500 to-purple-500 flex items-center justify-center">
          <span className="text-white font-bold text-sm">JC</span>
        </div>
        <span className="text-white font-semibold">Joki Admin</span>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-teal-500/20 to-purple-500/20 text-white border border-teal-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-400"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2 border-t border-gray-800">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Back to Site</span>
        </Link>
        <button
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors disabled:opacity-50"
        >
          <DoorOpen className="w-5 h-5" />
          <span>{isSigningOut ? 'Signing out...' : 'Logout'}</span>
        </button>
      </div>
    </motion.aside>
  );
}
