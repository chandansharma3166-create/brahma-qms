"use client";

import React, { useState } from "react";
import Link from "next/link";
import FocusTimer from "./FocusTimer";
import { BookOpen, PlusCircle, Bell, Search, X, Sparkles, CheckCircle2 } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [subject, setSubject] = useState("BIOLOGY");
  const [chapter, setChapter] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [notes, setNotes] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim() || !chapter.trim()) return;

    const newQuestion = {
      id: `NOTE-${Date.now().toString().slice(-4)}`,
      subject,
      chapter,
      topic: "Personal Note",
      questionText,
      questionType: "MCQ",
      options: [
        { id: "A", text: "Option A", isCorrect: true },
        { id: "B", text: "Option B", isCorrect: false },
        { id: "C", text: "Option C", isCorrect: false },
        { id: "D", text: "Option D", isCorrect: false },
      ],
      explanation: "Self-curated notebook entry.",
      difficulty: "MEDIUM",
      personalNotes: notes,
      createdAt: new Date().toISOString().split("T")[0],
    };

    if (typeof window !== "undefined") {
      const existing = JSON.parse(localStorage.getItem("brahma_notebook_entries") || "[]");
      localStorage.setItem("brahma_notebook_entries", JSON.stringify([newQuestion, ...existing]));
    }

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      setIsOpen(false);
      setChapter("");
      setQuestionText("");
      setNotes("");
    }, 1200);
  };

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-sage-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 gap-4">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
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
          </Link>

          {/* Search */}
          <div className="relative w-full max-w-xs hidden md:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-sage-400" />
            <input
              type="text"
              placeholder="Search problems, topics..."
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-sage-50 border border-sage-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-sage-500 text-sage-800 placeholder:text-sage-400"
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <FocusTimer />

            {/* Click to open popup */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-sage-500 px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-sage-600 cursor-pointer"
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

      {/* Global Add Question Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white border border-sage-200 rounded-2xl p-6 shadow-xl w-full max-w-lg space-y-4 relative">
            <div className="flex items-center justify-between border-b border-sage-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sage-500" />
                <h3 className="text-sm font-bold text-sage-900">Add Personal NEET Question</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-sage-400 hover:text-sage-700 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {isSaved ? (
              <div className="p-6 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="text-sm font-bold text-sage-900">Question Saved to Notebook!</p>
              </div>
            ) : (
              <form onSubmit={handleCreateQuestion} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-sage-700 block mb-1">Subject</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full text-xs p-2.5 bg-sage-50 border border-sage-200 rounded-xl text-sage-900 focus:outline-none"
                    >
                      <option value="BIOLOGY">Biology</option>
                      <option value="PHYSICS">Physics</option>
                      <option value="CHEMISTRY">Chemistry</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-sage-700 block mb-1">Chapter Name</label>
                    <input
                      type="text"
                      required
                      value={chapter}
                      onChange={(e) => setChapter(e.target.value)}
                      placeholder="e.g. Chemical Bonding"
                      className="w-full text-xs p-2.5 bg-sage-50 border border-sage-200 rounded-xl text-sage-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-sage-700 block mb-1">Question Text</label>
                  <textarea
                    required
                    rows={3}
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder="Enter question statement or formula..."
                    className="w-full text-xs p-2.5 bg-sage-50 border border-sage-200 rounded-xl text-sage-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-sage-700 block mb-1">Personal Note / Hint (Optional)</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Remember lone pair repulsion rule"
                    className="w-full text-xs p-2.5 bg-sage-50 border border-sage-200 rounded-xl text-sage-900 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-sage-600 hover:bg-sage-50 rounded-xl border border-sage-200 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-white bg-sage-500 hover:bg-sage-600 rounded-xl transition cursor-pointer"
                  >
                    Save Question
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}