"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Home,
  Trash2
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

  // Sync questions from localStorage
  const loadQueue = () => {
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
      // Fallback if notebook is empty
      setQueue(SEED_QUESTIONS.slice(0, 3));
    }
  };

  useEffect(() => {
    setMounted(true);
    loadQueue();
  }, []);

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
  };

  const removeFromQueueAndProceed = () => {
    if (!currentQ) return;

    // 1. Remove from localStorage
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("brahma_notebook_entries");
      if (stored) {
        try {
          const parsed: Question[] = JSON.parse(stored);
          const updated = parsed.filter((q) => q.id !== currentQ.id);
          localStorage.setItem("brahma_notebook_entries", JSON.stringify(updated));
        } catch (e) {
          console.error("Error updating queue", e);
        }
      }
    }

    // 2. Advance to next or complete
    if (currentIndex + 1 < queue.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
    }
  };

  if (queue.length === 0 || isCompleted) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4 bg-white border border-sage-200 rounded-3xl p-8">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
          <Sparkles className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-sage-900">Revision Deck Cleared!</h2>
        <p className="text-xs text-sage-600">
          All pending questions have been reviewed and removed from your queue.
        </p>
        <div className="flex justify-center gap-3 pt-4">
          <Link
            href="/"
            className="px-5 py-2.5 bg-sage-600 hover:bg-sage-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Header */}
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

        {/* Explanation */}
        {isAnswered && (
          <div className="p-4 rounded-xl bg-sage-50 border border-sage-200 space-y-2 text-xs">
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

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-sage-100">
          <button
            type="button"
            onClick={removeFromQueueAndProceed}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-semibold transition cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Mark Mastered & Remove</span>
          </button>

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
              onClick={removeFromQueueAndProceed}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition cursor-pointer"
            >
              <span>{currentIndex + 1 < queue.length ? "Next Problem" : "Finish Deck"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}