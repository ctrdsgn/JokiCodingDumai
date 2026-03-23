import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Instagram, Mail, MapPin } from 'lucide-react';

const currentYear = new Date().getFullYear();

const footerLinks = {
  navigation: [
    { href: '/', label: 'Home' },
    { href: '/#services', label: 'Services' },
    { href: '/#portfolio', label: 'Portfolio' },
    { href: '/#promo', label: 'Promo' },
  ],
  services: [
    { label: 'Website Development' },
    { label: 'Landing Pages' },
    { label: 'E-Commerce Sites' },
    { label: 'Web Applications' },
  ],
};

const socialLinks = [
  {
    href: 'https://github.com',
    icon: Github,
    label: 'GitHub',
  },
  {
    href: 'https://instagram.com',
    icon: Instagram,
    label: 'Instagram',
  },
  {
    href: 'mailto:contact@jokicodingdumai.com',
    icon: Mail,
    label: 'Email',
  },
];

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-gradient-to-r from-deep-blue via-purple-950 to-teal-950 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 via-purple-400 to-deep-blue-400 bg-clip-text text-transparent">
                Joki Coding Dumai
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-4 max-w-md">
              Professional web development services in Dumai. We create modern, 
              responsive, and SEO-optimized websites tailored to your business needs.
            </p>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <MapPin size={16} />
              <span>Dumai, Riau, Indonesia</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-teal-400 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((service) => (
                <li key={service.label}>
                  <span className="text-gray-400 text-sm">{service.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-teal-400 transition-all duration-200 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-gray-500 text-sm">
              © {currentYear} Joki Coding Dumai. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
