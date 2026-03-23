import { ReactNode } from 'react';
import { FadeIn } from './FadeIn';

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
}

export function Section({
  id,
  title,
  subtitle,
  children,
  className = '',
  dark = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-20 md:py-28 ${dark ? 'bg-gray-900/50' : ''} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <FadeIn direction="up" className="text-center mb-16">
            {subtitle && (
              <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-teal-500/20 to-purple-500/20 border border-teal-500/30 text-teal-400 text-sm font-medium mb-4">
                {subtitle}
              </span>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                {title}
              </h2>
            )}
          </FadeIn>
        )}
        {children}
      </div>
    </section>
  );
}
