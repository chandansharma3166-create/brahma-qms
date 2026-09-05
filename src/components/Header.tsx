import React from "react";
import { BookOpen, PlusCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-sage-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sage-100 text-sage-600">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-sage-900">
              Brahma QMS
            </h1>
            <p className="text-xs text-sage-600">
              Question Management Plan
            </p>
          </div>
        </div>

        <div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-sage-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-sage-600 focus:outline-none"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Add Question</span>
          </button>
        </div>
      </div>
    </header>
  );
}