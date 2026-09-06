"use client";

import React, { useState } from "react";
import Link from "next/link";
import FocusTimer from "./FocusTimer";
import { 
  BookOpen, 
  PlusCircle, 
  Bell, 
  Search, 
  X, 
  Sparkles, 
  CheckCircle2, 
  Upload, 
  Image as ImageIcon,
  HelpCircle
} from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Form State
  const [subject, setSubject] = useState("BIOLOGY");
  const [chapter, setChapter] = useState("");
  const [topic, setTopic] = useState("");
  const [targetExam, setTargetExam] = useState("NEET");
  const [isPyq, setIsPyq] = useState(false);
  const [pyqYear, setPyqYear] = useState("2024");
  const [difficulty, setDifficulty] = useState("MODERATE");
  const [questionText, setQuestionText] = useState("");
  const [diagramUrl, setDiagramUrl] = useState<string | null>(null);

  // 4 Options
  const [optA, setOptA] = useState("");
  const [optB, setOptB] = useState("");
  const [optC, setOptC] = useState("");
  const [optD, setOptD] = useState("");
  const [correctOpt, setCorrectOpt] = useState("A");

  const [explanation, setExplanation] = useState("");
  const [personalNotes, setPersonalNotes] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setDiagramUrl(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim() || !chapter.trim()) return;

    const newQuestion = {
      id: `${targetExam}-${Date.now().toString().slice(-4)}`,
      subject,
      chapter,
      topic: topic || "Core Concept",
      exam: targetExam,
      isPyq,
      pyqYear: isPyq ? pyqYear : undefined,
      difficulty,
      questionText,
      diagram: diagramUrl,
      options: [
        { id: "A", text: optA || "Option A", isCorrect: correctOpt === "A" },
        { id: "B", text: optB || "Option B", isCorrect: correctOpt === "B" },
        { id: "C", text: optC || "Option C", isCorrect: correctOpt === "C" },
        { id: "D", text: optD || "Option D", isCorrect: correctOpt === "D" },
      ],
      explanation: explanation || "Refer to NCERT/Standard Reference Manual.",
      personalNotes,
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
      // Reset form
      setChapter("");
      setTopic("");
      setQuestionText("");
      setDiagramUrl(null);
      setOptA("");
      setOptB("");
      setOptC("");
      setOptD("");
      setExplanation("");
      setPersonalNotes("");
    }, 1200);
  };

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-sage-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 gap-4">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sage-100 text-sage-600">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight text-sage-900 leading-tight">
                Brahma QMS
              </h1>
              <p className="text-xs text-sage-600 font-medium">
                NEET & JEE Question Intelligence
              </p>
            </div>
          </Link>

          <div className="relative w-full max-w-xs hidden md:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-sage-400" />
            <input
              type="text"
              placeholder="Search problems, topics..."
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-sage-50 border border-sage-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-sage-500 text-sage-800 placeholder:text-sage-400"
            />
          </div>

          <div className="flex items-center gap-3">
            <FocusTimer />

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

      {/* Full-Feature Question Creation Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border border-sage-200 rounded-2xl p-6 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto space-y-5 relative my-auto">
            
            <div className="flex items-center justify-between border-b border-sage-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sage-500" />
                <h3 className="text-sm font-bold text-sage-900">Curate New Problem (NEET / JEE)</h3>
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
              <div className="p-10 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <p className="text-base font-bold text-sage-900">Question Successfully Ingested!</p>
                <p className="text-xs text-sage-600">Saved directly to your local question bank.</p>
              </div>
            ) : (
              <form onSubmit={handleCreateQuestion} className="space-y-4">
                
                {/* Meta Row: Exam, Subject, Difficulty */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-sage-700 block mb-1">Target Exam</label>
                    <select
                      value={targetExam}
                      onChange={(e) => setTargetExam(e.target.value)}
                      className="w-full text-xs p-2.5 bg-sage-50 border border-sage-200 rounded-xl text-sage-900 focus:outline-none"
                    >
                      <option value="NEET">NEET</option>
                      <option value="JEE_MAIN">JEE Main</option>
                      <option value="JEE_ADVANCED">JEE Advanced</option>
                    </select>
                  </div>

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
                    <label className="text-[11px] font-bold text-sage-700 block mb-1">Difficulty Level</label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="w-full text-xs p-2.5 bg-sage-50 border border-sage-200 rounded-xl text-sage-900 focus:outline-none"
                    >
                      <option value="EASY">Easy</option>
                      <option value="MODERATE">Moderate</option>
                      <option value="TOUGH">Tough</option>
                    </select>
                  </div>
                </div>

                {/* Chapter, Topic & PYQ Year */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-sage-700 block mb-1">Chapter Name</label>
                    <input
                      type="text"
                      required
                      value={chapter}
                      onChange={(e) => setChapter(e.target.value)}
                      placeholder="e.g. Rotational Motion"
                      className="w-full text-xs p-2.5 bg-sage-50 border border-sage-200 rounded-xl text-sage-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-sage-700 block mb-1">Topic / Concept</label>
                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="e.g. Moment of Inertia"
                      className="w-full text-xs p-2.5 bg-sage-50 border border-sage-200 rounded-xl text-sage-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-bold text-sage-700">PYQ Archive?</label>
                      <input
                        type="checkbox"
                        checked={isPyq}
                        onChange={(e) => setIsPyq(e.target.checked)}
                        className="w-3.5 h-3.5 accent-sage-600 rounded"
                      />
                    </div>
                    <input
                      type="text"
                      disabled={!isPyq}
                      value={pyqYear}
                      onChange={(e) => setPyqYear(e.target.value)}
                      placeholder="e.g. 2024"
                      className="w-full text-xs p-2.5 bg-sage-50 border border-sage-200 rounded-xl text-sage-900 focus:outline-none disabled:opacity-40"
                    />
                  </div>
                </div>

                {/* Question Stem */}
                <div>
                  <label className="text-[11px] font-bold text-sage-700 block mb-1">
                    Question Stem (Supports LaTeX like $E = mc^2$)
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder="Type the complete problem statement here..."
                    className="w-full text-xs p-3 bg-sage-50 border border-sage-200 rounded-xl text-sage-900 focus:outline-none"
                  />
                </div>

                {/* Diagram / Image Upload */}
                <div>
                  <label className="text-[11px] font-bold text-sage-700 block mb-1 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-sage-500" />
                    Attach Diagram / Schematic (Optional)
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-sage-200 bg-sage-50 hover:bg-sage-100 text-xs font-semibold text-sage-700 transition">
                      <Upload className="w-3.5 h-3.5 text-sage-500" />
                      <span>Upload Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    {diagramUrl && (
                      <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Image Attached
                      </span>
                    )}
                  </div>
                  {diagramUrl && (
                    <div className="mt-2 p-2 border border-sage-200 rounded-xl max-w-xs bg-sage-50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={diagramUrl} alt="Diagram preview" className="rounded-lg max-h-36 object-contain mx-auto" />
                    </div>
                  )}
                </div>

                {/* 4 Options Grid with Correct Answer Picker */}
                <div className="space-y-2 border-t border-sage-100 pt-3">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-sage-900">
                      Options & Key (Select the correct option bubble)
                    </label>
                    <span className="text-[10px] text-sage-500">Selected Key: Option {correctOpt}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      { id: "A", val: optA, set: setOptA },
                      { id: "B", val: optB, set: setOptB },
                      { id: "C", val: optC, set: setOptC },
                      { id: "D", val: optD, set: setOptD },
                    ].map((opt) => (
                      <div
                        key={opt.id}
                        className={`flex items-center gap-2 p-2 rounded-xl border transition ${
                          correctOpt === opt.id
                            ? "border-emerald-500 bg-emerald-50/40"
                            : "border-sage-200 bg-sage-50/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="correctOptionRadio"
                          checked={correctOpt === opt.id}
                          onChange={() => setCorrectOpt(opt.id)}
                          className="w-3.5 h-3.5 accent-emerald-600 cursor-pointer"
                        />
                        <span className="text-xs font-bold text-sage-700 w-4">{opt.id}</span>
                        <input
                          type="text"
                          required
                          value={opt.val}
                          onChange={(e) => opt.set(e.target.value)}
                          placeholder={`Option ${opt.id} statement`}
                          className="w-full text-xs p-1.5 bg-white border border-sage-200 rounded-lg text-sage-900 focus:outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Explanations & Notes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-sage-100 pt-3">
                  <div>
                    <label className="text-[11px] font-bold text-sage-700 block mb-1">
                      Official Explanation / NCERT Proof
                    </label>
                    <textarea
                      rows={2}
                      value={explanation}
                      onChange={(e) => setExplanation(e.target.value)}
                      placeholder="Step-by-step resolution or NCERT reference..."
                      className="w-full text-xs p-2.5 bg-sage-50 border border-sage-200 rounded-xl text-sage-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-sage-700 block mb-1">
                      Personal Trap / Formula Mnemonic (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={personalNotes}
                      onChange={(e) => setPersonalNotes(e.target.value)}
                      placeholder="e.g. Watch out for minus sign in work done..."
                      className="w-full text-xs p-2.5 bg-sage-50 border border-sage-200 rounded-xl text-sage-900 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="flex justify-end gap-2 pt-3 border-t border-sage-100">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-sage-600 hover:bg-sage-50 rounded-xl border border-sage-200 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold text-white bg-sage-500 hover:bg-sage-600 rounded-xl transition cursor-pointer"
                  >
                    Save to Problem Bank
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