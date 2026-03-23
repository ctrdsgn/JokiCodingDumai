'use client';

import { motion } from 'framer-motion';
import { Monitor, ShoppingCart, Code, Check, ArrowRight, Zap, Palette, Smartphone } from 'lucide-react';
import Link from 'next/link';
import { FadeIn } from './FadeIn';

const iconMap: Record<string, React.ElementType> = {
  Monitor,
  ShoppingCart,
  Code,
};

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  icon?: string | null;
  features: unknown; // JSON field
  gradient?: string | null;
  popular: boolean;
}

interface ServicesProps {
  services: Service[];
}

export function Services({ services }: ServicesProps) {
  const additionalFeatures = [
    { icon: Zap, title: 'Lightning Fast', description: 'Optimized for speed' },
    { icon: Palette, title: 'Modern Design', description: 'Beautiful UI/UX' },
    { icon: Smartphone, title: 'Fully Responsive', description: 'All devices' },
  ];

  return (
    <section id="services" className="py-20 md:py-28 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn direction="up" className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-teal-500/20 to-purple-500/20 border border-teal-500/30 text-teal-400 text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Packages That Fit Your Needs
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose from our range of web development services, designed to help businesses
            of all sizes establish a strong online presence.
          </p>
        </FadeIn>

        {/* Additional Features */}
        <FadeIn direction="up" delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="p-3 rounded-lg bg-gradient-to-r from-teal-500/20 to-purple-500/20">
                  <feature.icon className="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon && iconMap[service.icon] ? iconMap[service.icon] : Monitor;
            const features = Array.isArray(service.features) ? service.features : [];

            return (
              <FadeIn key={service.id} direction="up" delay={index * 0.15}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -8 }}
                  className={`relative h-full p-8 rounded-2xl border transition-all duration-300 ${
                    service.popular
                      ? 'bg-gradient-to-b from-purple-900/50 to-gray-900/50 border-purple-500/50 shadow-lg shadow-purple-500/20'
                      : 'bg-gray-900/50 border-white/10 hover:border-white/20'
                  }`}
                >
                  {service.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${service.gradient || 'from-teal-500 to-cyan-500'} mb-6`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-400 mb-6">{service.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-white">{service.price}</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {features.map((feature: string, featureIndex: number) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href="/order"
                    className={`group flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                      service.popular
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/30'
                        : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>

        {services.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No services available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}
