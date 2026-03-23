import { ReactNode } from 'react';

interface AdminCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}

export function AdminCard({ title, children, className = '', action }: AdminCardProps) {
  return (
    <div className={`bg-gray-900 border border-gray-800 rounded-xl overflow-hidden ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}
