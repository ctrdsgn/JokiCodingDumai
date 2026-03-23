'use client';

import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Percent, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { FadeIn } from './FadeIn';

const iconMap: Record<string, React.ElementType> = {
  Percent,
  Sparkles,
};

interface Promo {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: Date | null;
  gradient?: string | null;
  active: boolean;
}

interface PromoProps {
  promos: Promo[];
}

export function Promo({ promos }: PromoProps) {
  const activePromos = promos.filter((p) => p.active);

  return (
    <section id="promo" className="py-20 md:py-28 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn direction="up" className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-teal-500/20 to-purple-500/20 border border-teal-500/30 text-teal-400 text-sm font-medium mb-4">
            Special Offers
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Current Promotions
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Take advantage of our limited-time offers and get premium web development
            services at special prices.
          </p>
        </FadeIn>

        {/* Promo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activePromos.map((promo, index) => {
            const IconComponent = iconMap[promo.title.includes('Bundle') ? 'Sparkles' : 'Percent'] || Percent;

            return (
              <FadeIn key={promo.id} direction="up" delay={index * 0.15}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 p-8"
                >
                  {/* Background Gradient */}
                  <div
                    className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${promo.gradient || 'from-red-500 to-pink-500'} opacity-20 blur-3xl`}
                  />

                  <div className="relative">
                    {/* Icon & Discount Badge */}
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className={`p-4 rounded-xl bg-gradient-to-r ${promo.gradient || 'from-red-500 to-pink-500'}`}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <span
                        className={`px-4 py-2 rounded-full bg-gradient-to-r ${promo.gradient || 'from-red-500 to-pink-500'} text-white font-bold`}
                      >
                        {promo.discount}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-white mb-3">{promo.title}</h3>
                    <p className="text-gray-400 mb-6">{promo.description}</p>

                    {/* Valid Until */}
                    {promo.validUntil && (
                      <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
                        <Calendar className="w-4 h-4" />
                        <span>Valid until: {new Date(promo.validUntil).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                    )}

                    {/* CTA */}
                    <Link
                      href="/order"
                      className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all duration-300"
                    >
                      Claim Offer
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>

        {activePromos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No active promotions at the moment.</p>
          </div>
        )}

        {/* Newsletter / Contact CTA */}
        <FadeIn direction="up" delay={0.3}>
          <div className="mt-16 relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-900/50 to-purple-900/50 border border-white/10 p-8 md:p-12">
            <div className="relative z-10 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Don&apos;t Miss Out on Future Deals
              </h3>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                Subscribe to our newsletter and be the first to know about new promotions,
                updates, and exclusive offers.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/50 transition-colors"
                />
                <button className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-purple-500 text-white font-semibold hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
