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
    <nav aria-label="breadcrumb" className="bg-[#F7F4EF] border-b border-[#05191b]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <ol className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
          <li className="flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-1 text-[#05191b]/50 transition-colors hover:text-[#E0A63D]"
            >
              <Home className="h-3.5 w-3.5" />
              <span>Início</span>
            </Link>
          </li>
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <ChevronRight className="h-3.5 w-3.5 text-[#05191b]/30" />
              {item.href ? (
                <Link
                  href={item.href}
                  className="font-medium text-[#05191b]/50 transition-colors hover:text-[#E0A63D]"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-bold text-[#05191b]">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
