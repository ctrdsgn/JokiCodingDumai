'use client';

import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  gradient: 'teal' | 'purple' | 'blue' | 'orange';
}

const gradientClasses = {
  teal: 'from-teal-500 to-cyan-500',
  purple: 'from-purple-500 to-pink-500',
  blue: 'from-blue-500 to-indigo-500',
  orange: 'from-orange-500 to-red-500',
};

export function StatCard({ title, value, icon: Icon, trend, gradient }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {trend && (
            <p
              className={`text-sm mt-2 ${
                trend.value >= 0 ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {trend.value >= 0 ? '+' : ''}
              {trend.value}% {trend.label}
            </p>
          )}
        </div>
        <div
          className={`p-3 rounded-lg bg-gradient-to-r ${gradientClasses[gradient]}`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
}
