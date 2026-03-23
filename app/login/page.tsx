'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, User, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

function LoginFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        username: formData.username,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid username or password');
      } else {
        const callbackUrl = searchParams.get('callbackUrl') || '/admin';
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-red-400 text-sm">{error}</p>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
            Username
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              <User className="w-5 h-5" />
            </div>
            <input
              id="username"
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
              placeholder="Enter your username"
              autoComplete="username"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
            Password
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              <Lock className="w-5 h-5" />
            </div>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-purple-500 text-white font-semibold hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-deep-blue to-purple-950">
        <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-deep-blue to-purple-950 px-4 py-12">
      <div className="absolute inset-0 overflow-hidden">
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
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-teal-500 to-purple-500 mb-4 shadow-lg shadow-purple-500/30"
            >
              <Lock className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold text-white mb-2">Admin Access</h1>
            <p className="text-gray-400 text-sm">Joki Coding Dumai - CMS Login</p>
          </div>

          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-teal-500/20 to-purple-500/20 border border-teal-500/30 text-teal-400 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              Secure Admin Portal
            </span>
          </div>

          <LoginFormInner />

          <div className="mt-6 pt-6 border-t border-gray-800 text-center">
            <a href="/" className="text-sm text-gray-400 hover:text-teal-400 transition-colors">
              ← Back to Website
            </a>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-500 text-xs mt-6"
        >
          Protected by NextAuth.js • Admin access only
        </motion.p>
      </motion.div>
    </div>
  );
}
