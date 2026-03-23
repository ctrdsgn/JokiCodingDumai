'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { FadeIn } from './FadeIn';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  tags: unknown; // JSON field
  link?: string | null;
  github?: string | null;
  featured: boolean;
}

interface PortfolioProps {
  projects: Project[];
}

export function Portfolio({ projects }: PortfolioProps) {
  const categories = ['All', 'E-Commerce', 'Landing Page', 'Web App'];

  return (
    <section id="portfolio" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn direction="up" className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-teal-500/20 to-purple-500/20 border border-teal-500/30 text-teal-400 text-sm font-medium mb-4">
            Our Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our recent work and see how we&apos;ve helped businesses transform
            their digital presence with custom web solutions.
          </p>
        </FadeIn>

        {/* Category Filter (Visual only for now) */}
        <FadeIn direction="up" delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  index === 0
                    ? 'bg-gradient-to-r from-teal-500 to-purple-500 text-white'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const tags = Array.isArray(project.tags) ? project.tags : [];

            return (
              <FadeIn key={project.id} direction="up" delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group relative overflow-hidden rounded-2xl bg-gray-900/50 border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10" />
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center gap-4">
                      {project.link && (
                        <a
                          href={project.link}
                          className="p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-teal-500 transition-colors"
                          aria-label="View project"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          className="p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-purple-500 transition-colors"
                          aria-label="View code"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-teal-500/90 to-purple-500/90 text-white text-xs font-medium backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag: string, tagIndex: number) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-medium hover:border-teal-500/50 hover:text-teal-400 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hover Arrow */}
                  <div className="absolute bottom-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="w-6 h-6 text-teal-400" />
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No projects to display yet.</p>
          </div>
        )}

        {/* View All CTA */}
        <FadeIn direction="up" delay={0.4}>
          <div className="text-center mt-12">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              View All Projects
              <ArrowUpRight className="w-5 h-5" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
