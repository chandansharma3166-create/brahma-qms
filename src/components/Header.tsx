"use client";

import React from "react";
import FocusTimer from "./FocusTimer";
import { BookOpen, PlusCircle, Bell, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-sage-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 gap-4">
        {/* Brand Identification */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sage-100 text-sage-600">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-sage-900 leading-tight">
              Brahma QMS
            </h1>
            <p className="text-xs text-sage-600 font-medium">
              NEET Question Management System
            </p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="relative w-full max-w-xs hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-sage-400" />
          <input
            type="text"
            placeholder="Search problems, topics..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-sage-50 border border-sage-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-sage-500 text-sage-800 placeholder:text-sage-400"
          />
        </div>

        {/* Right Section: Focus Timer & Actions */}
        <div className="flex items-center gap-3">
          <FocusTimer />

          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-xl bg-sage-500 px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-sage-600 focus:outline-none"
          >
            <PlusCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Add Question</span>
          </button>

          <button
            type="button"
            className="p-2 rounded-xl border border-sage-200 text-sage-600 hover:bg-sage-50 transition relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-emerald-500 rounded-full" />
          </button>

          <div className="w-8 h-8 rounded-xl bg-sage-700 text-white font-bold text-xs flex items-center justify-center">
            CS
          </div>
        </div>
      </div>
    </header>
  );
}