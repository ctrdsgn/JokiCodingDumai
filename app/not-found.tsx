import Link from 'next/link';
import { notFound } from 'next/navigation';

// Force dynamic rendering to avoid Framer Motion SSR issues in layout
export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold bg-gradient-to-r from-teal-400 via-purple-400 to-deep-blue-400 bg-clip-text text-transparent">
        404
      </h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-200">Page Not Found</h2>
      <p className="mt-2 text-gray-400 text-center max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-3 rounded-lg bg-gradient-to-r from-teal to-purple text-white font-medium hover:opacity-90 transition-opacity"
      >
        Return Home
      </Link>
    </div>
  );
}
