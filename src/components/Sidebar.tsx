"use client";

import React from "react";
import { 
  BookOpen, 
  Compass, 
  RotateCcw, 
  FileCheck2, 
  BarChart3, 
  Bookmark, 
  Settings 
} from "lucide-react";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}

export default function Sidebar() {
  const navItems: NavItem[] = [
    { label: "Dashboard", icon: <Compass className="w-5 h-5" />, active: true },
    { label: "Question Explorer", icon: <BookOpen className="w-5 h-5" /> },
    { label: "Revision Center", icon: <RotateCcw className="w-5 h-5" /> },
    { label: "Mock Arena", icon: <FileCheck2 className="w-5 h-5" /> },
    { label: "Analytics", icon: <BarChart3 className="w-5 h-5" /> },
    { label: "Notebook", icon: <Bookmark className="w-5 h-5" /> },
    { label: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 bg-white border-r border-sage-200 min-h-screen flex flex-col justify-between p-4">
      <div className="space-y-6">
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="h-3 w-3 rounded-full bg-sage-500" />
            <h2 className="text-base font-bold text-sage-900 tracking-tight">BRAHMA QMS</h2>
          </div>
          <p className="text-xs text-sage-600 pl-5 font-medium">NEET Learning OS</p>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                item.active 
                  ? "bg-sage-100 text-sage-900 font-semibold" 
                  : "text-sage-800 hover:bg-sage-50"
              }`}
            >
              <span className={item.active ? "text-sage-600" : "text-sage-500"}>
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-3 border-t border-sage-100 bg-sage-50 rounded-lg">
        <p className="text-xs font-semibold text-sage-800">Target: NEET</p>
        <p className="text-[11px] text-sage-600 mt-0.5">Focus: High-Yield NCERT</p>
      </div>
    </aside>
  );
}