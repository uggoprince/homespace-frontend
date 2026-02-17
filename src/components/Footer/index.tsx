'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiChevronUp } from 'react-icons/hi';

const Footer = () => {
  const pathname = usePathname();

  if (pathname.startsWith('/dashboard')) return null;
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <footer className="bg-white dark:bg-slate-950 border-t-[0.5px] border-gray-300 dark:border-t-gray-700 w-full transition-colors z-30">
      <div className="container mx-auto">
        {/* Top row */}
        <div className="py-2 sm:py-4 flex flex-col lg:flex-row items-center justify-between gap-6 border-b border-gray-100 dark:border-slate-800/50">

          {/* Logo + Tagline */}
          <div className="flex flex-col items-center lg:items-start">
            <Link href="/" className="text-indigo-600 dark:text-white font-bold text-xl tracking-tight">
              HomeSpace
            </Link>
            <p className="text-xs text-gray-500 dark:text-slate-500 mt-1">
              Find your perfect home
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-2">
            <Link
              href="/agencies"
              className="text-sm text-gray-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 cursor-pointer"
            >
              Agencies
            </Link>
            <Link
              href="/about"
              className="text-sm text-gray-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 cursor-pointer"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm text-gray-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 cursor-pointer"
            >
              Contact
            </Link>
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Facebook"
              className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 hover:scale-110 cursor-pointer"
            >
              <FaFacebook className="w-5 h-5" />
            </button>
            <button
              type="button"
              aria-label="Instagram"
              className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 dark:text-slate-400 hover:bg-pink-50 dark:hover:bg-pink-900/30 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-200 hover:scale-110 cursor-pointer"
            >
              <FaInstagram className="w-5 h-5" />
            </button>
            <button
              type="button"
              aria-label="X (Twitter)"
              className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white transition-all duration-200 hover:scale-110 cursor-pointer"
            >
              <FaXTwitter className="w-5 h-5" />
            </button>
            <button
              type="button"
              aria-label="WhatsApp"
              className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 dark:text-slate-400 hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-600 dark:hover:text-green-400 transition-all duration-200 hover:scale-110 cursor-pointer"
            >
              <FaWhatsapp className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bottom row */}
        <div className="py-2 sm:py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Copyright + Email */}
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 text-xs text-gray-500 dark:text-slate-500">
            <p>
              ©
              {new Date().getFullYear()}
              {' '}
              HomeSpace. All rights reserved.
            </p>
            <span className="hidden sm:inline">•</span>
          </div>

          {/* Links + Back to top */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/privacy"
              className="text-xs text-gray-500 dark:text-slate-500 hover:text-gray-700 dark:hover:text-slate-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-gray-500 dark:text-slate-500 hover:text-gray-700 dark:hover:text-slate-300 transition-colors cursor-pointer"
            >
              Terms of Service
            </Link>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="
                w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-slate-800
                text-gray-500 dark:text-slate-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50
                hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200
                hover:-translate-y-0.5 cursor-pointer
              "
            >
              <HiChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
