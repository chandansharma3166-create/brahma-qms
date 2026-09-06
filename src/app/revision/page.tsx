"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Home 
} from "lucide-react";
import { SEED_QUESTIONS } from "../../data/seedQuestions";
import { Question } from "../../types/question";

export default function RevisionCenterPage() {
  const [mounted, setMounted] = useState(false);
  const [queue, setQueue] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [stats, setStats] = useState({ correct: 0, reviewed: 0 });

  // Load questions safely on client mount
  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("brahma_notebook_entries");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setQueue(parsed);
            return;
          }
        } catch (e) {
          console.error("Failed to parse notebook queue", e);
        }
      }
      // Fallback to initial practice set if empty
      setQueue(SEED_QUESTIONS.slice(0, 3));
    }
  }, []);

  // Avoid hydration mismatch before client mount
  if (!mounted) {
    return (
      <div className="max-w-3xl mx-auto py-12 text-center text-xs text-sage-500">
        Loading revision session...
      </div>
    );
  }

  const currentQ = queue[currentIndex];

  const handleSelect = (optId: string) => {
    if (isAnswered) return;
    setSelectedOption(optId);
  };

  const handleConfirmAnswer = () => {
    if (!selectedOption || !currentQ) return;
    setIsAnswered(true);

    const isCorrect = currentQ.options?.find(
      (opt) => (opt.id === selectedOption || opt.text === selectedOption) && opt.isCorrect
    );

    setStats((prev) => ({
      reviewed: prev.reviewed + 1,
      correct: isCorrect ? prev.correct + 1 : prev.correct,
    }));
  };

  const handleNext = () => {
    if (!currentQ) return;

    // Remove the current reviewed question from brahma_notebook_entries immediately
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("brahma_notebook_entries");
      if (stored) {
        try {
          const parsed: Question[] = JSON.parse(stored);
          const updated = parsed.filter((q) => q.id !== currentQ.id);
          localStorage.setItem("brahma_notebook_entries", JSON.stringify(updated));
        } catch (e) {
          console.error("Failed to update notebook queue", e);
        }
      }
    }

    if (currentIndex + 1 < queue.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
    }
  };

  if (queue.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-sage-900">Revision Queue All Clear!</h2>
        <p className="text-xs text-sage-600">No pending spaced repetition questions due today.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-sage-600 hover:bg-sage-700 text-white rounded-xl text-xs font-semibold"
        >
          <Home className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4 bg-white border border-sage-200 rounded-3xl p-8">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
          <Sparkles className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-sage-900">Session Finished!</h2>
        <p className="text-xs text-sage-600">
          Reviewed <strong className="text-sage-900">{stats.reviewed}</strong> questions with{" "}
          <strong className="text-emerald-600">{stats.correct} correct</strong> answers.
        </p>
        <div className="flex justify-center gap-3 pt-4">
          <Link
            href="/"
            className="px-5 py-2.5 bg-sage-600 hover:bg-sage-700 text-white rounded-xl text-xs font-bold transition"
          >
            Go to Dashboard
          </Link>
          <button
            type="button"
            onClick={() => {
              setCurrentIndex(0);
              setSelectedOption(null);
              setIsAnswered(false);
              setIsCompleted(false);
            }}
            className="px-5 py-2.5 border border-sage-300 text-sage-700 hover:bg-sage-50 rounded-xl text-xs font-bold transition cursor-pointer"
          >
            Review Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-sage-900">Spaced Revision Deck</h1>
          <p className="text-xs text-sage-500">
            Card {currentIndex + 1} of {queue.length}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg">
            {currentQ?.subject || "NEET"}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 bg-sage-100 text-sage-700 rounded-lg">
            {currentQ?.difficulty || "MEDIUM"}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-sage-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-sage-600 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / queue.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white border border-sage-200 rounded-2xl p-6 shadow-sm space-y-5">
        <div>
          <span className="text-[11px] font-bold text-sage-400 uppercase tracking-wider block mb-1">
            {currentQ?.chapter || "High-Yield"} • {currentQ?.topic || "Core Concept"}
          </span>
          <h2 className="text-sm font-semibold text-sage-900 leading-relaxed">
            {currentQ?.questionText}
          </h2>
        </div>

        {/* Optional Diagram */}
        {currentQ?.diagram && (
          <div className="p-3 bg-sage-50 border border-sage-200 rounded-xl flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentQ.diagram}
              alt="Question Diagram"
              className="max-h-48 object-contain rounded-lg"
            />
          </div>
        )}

        {/* Options */}
        <div className="space-y-2.5">
          {currentQ?.options?.map((opt) => {
            const isSelected = selectedOption === opt.id || selectedOption === opt.text;
            let optStyle = "border-sage-200 bg-sage-50/50 hover:bg-sage-100/50";

            if (isAnswered) {
              if (opt.isCorrect) {
                optStyle = "border-emerald-500 bg-emerald-50/80 text-emerald-900 font-semibold";
              } else if (isSelected && !opt.isCorrect) {
                optStyle = "border-rose-400 bg-rose-50/80 text-rose-900 font-semibold";
              }
            } else if (isSelected) {
              optStyle = "border-sage-600 bg-sage-100/70 shadow-xs ring-1 ring-sage-600";
            }

            return (
              <button
                type="button"
                key={opt.id}
                disabled={isAnswered}
                onClick={() => handleSelect(opt.id)}
                className={`w-full text-left p-3 rounded-xl border text-xs transition flex items-center justify-between cursor-pointer ${optStyle}`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-md bg-white border border-sage-200 flex items-center justify-center font-bold text-[11px] text-sage-700">
                    {opt.id}
                  </span>
                  <span>{opt.text}</span>
                </div>

                {isAnswered && opt.isCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                )}
                {isAnswered && isSelected && !opt.isCorrect && (
                  <XCircle className="w-4 h-4 text-rose-500" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation revealed on submit */}
        {isAnswered && (
          <div className="p-4 rounded-xl bg-sage-50 border border-sage-200 space-y-2 text-xs animate-in fade-in duration-200">
            <div className="font-bold text-sage-900 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-sage-600" />
              <span>Explanation & NCERT Reference:</span>
            </div>
            <p className="text-sage-700 leading-relaxed">{currentQ?.explanation}</p>

            {currentQ?.personalNotes && (
              <div className="pt-2 border-t border-sage-200 mt-2 text-[11px] text-amber-800">
                <strong>Your Note:</strong> {currentQ.personalNotes}
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end pt-3 border-t border-sage-100">
          {!isAnswered ? (
            <button
              type="button"
              disabled={!selectedOption}
              onClick={handleConfirmAnswer}
              className="px-5 py-2.5 bg-sage-600 hover:bg-sage-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition cursor-pointer"
            >
              Verify Answer
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition cursor-pointer"
            >
              <span>{currentIndex + 1 < queue.length ? "Next Problem" : "Finish Session"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}