'use client';

import { motion } from 'framer-motion';
import { Code2, Rocket, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { FadeIn } from './FadeIn';

const codeSnippets = [
  { content: '<div className="hero">', delay: 0, x: '10%', y: '20%' },
  { content: 'const success = await', delay: 0.5, x: '80%', y: '30%' },
  { content: 'return <Website />', delay: 1, x: '15%', y: '70%' },
  { content: '// Build amazing things', delay: 1.5, x: '75%', y: '65%' },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-deep-blue to-purple-950">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-1/4 -left-1/4 w-96 h-96 bg-teal-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute -bottom-1/4 -right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
        />

        {/* Floating Code Snippets */}
        {codeSnippets.map((snippet, index) => (
          <motion.div
            key={index}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: snippet.delay,
            }}
            style={{
              left: snippet.x,
              top: snippet.y,
            }}
            className="absolute text-xs md:text-sm font-mono text-teal-400/60 whitespace-nowrap"
          >
            {snippet.content}
          </motion.div>
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn direction="up" delay={0.2}>
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-500/20 to-purple-500/20 border border-teal-500/30 mb-8"
          >
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span className="text-sm font-medium text-teal-300">
              Professional Web Development in Dumai
            </span>
          </motion.div>
        </FadeIn>

        <FadeIn direction="up" delay={0.3}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Transform Your Ideas Into{' '}
            <span className="bg-gradient-to-r from-teal-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Digital Reality
            </span>
          </h1>
        </FadeIn>

        <FadeIn direction="up" delay={0.4}>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10">
            We craft modern, high-performance websites that drive results. 
            From landing pages to full-stack applications, we bring your vision to life 
            with cutting-edge technology and stunning design.
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={0.5}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#services"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-teal-500 to-purple-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105"
            >
              <Rocket className="w-5 h-5" />
              Explore Services
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/#portfolio"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <Code2 className="w-5 h-5" />
              View Portfolio
            </Link>
          </div>
        </FadeIn>

        {/* Stats */}
        <FadeIn direction="up" delay={0.6}>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50+', label: 'Projects Completed' },
              { value: '30+', label: 'Happy Clients' },
              { value: '5+', label: 'Years Experience' },
              { value: '100%', label: 'Client Satisfaction' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-3 bg-white/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
