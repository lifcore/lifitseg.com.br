'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string | null;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className="border-b border-white/5 bg-[#071d1f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <ol className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
          <li className="flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-1 text-[#9db3a8] transition-colors hover:text-[#7cffc1]"
            >
              <Home className="h-3.5 w-3.5" />
              <span>Início</span>
            </Link>
          </li>
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <ChevronRight className="h-3.5 w-3.5 text-[#9db3a8]/50" />
              {item.href ? (
                <Link
                  href={item.href}
                  className="font-medium text-[#9db3a8] transition-colors hover:text-[#7cffc1]"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold text-[#eeecea]">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
