"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BookOpen, 
  Compass, 
  RotateCcw, 
  FileCheck2, 
  BarChart3, 
  Bookmark, 
  Settings 
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/", icon: <Compass className="w-5 h-5" /> },
    { label: "Question Explorer", href: "/explorer", icon: <BookOpen className="w-5 h-5" /> },
    { label: "Revision Center", href: "/revision", icon: <RotateCcw className="w-5 h-5" /> },
    { label: "Mock Arena", href: "/mock", icon: <FileCheck2 className="w-5 h-5" /> },
    { label: "Analytics", href: "/analytics", icon: <BarChart3 className="w-5 h-5" /> },
    { label: "Notebook", href: "/notebook", icon: <Bookmark className="w-5 h-5" /> },
    { label: "Settings", href: "/settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 bg-white border-r border-sage-200 min-h-screen flex flex-col justify-between p-4 flex-shrink-0">
      <div className="space-y-6">
        <Link href="/" className="block px-3 py-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="h-3 w-3 rounded-full bg-sage-500" />
            <h2 className="text-base font-bold text-sage-900 tracking-tight">BRAHMA QMS</h2>
          </div>
          <p className="text-xs text-sage-600 pl-5 font-medium">NEET Learning OS</p>
        </Link>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive 
                    ? "bg-sage-100 text-sage-900 font-semibold" 
                    : "text-sage-800 hover:bg-sage-50"
                }`}
              >
                <span className={isActive ? "text-sage-600" : "text-sage-500"}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-3 border-t border-sage-100 bg-sage-50 rounded-lg">
        <p className="text-xs font-semibold text-sage-800">Target: NEET</p>
        <p className="text-[11px] text-sage-600 mt-0.5">Focus: High-Yield NCERT</p>
      </div>
    </aside>
  );
}