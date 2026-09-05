"use client";

import React, { useState, useEffect } from "react";
import { SEED_QUESTIONS } from "../../data/seedQuestions";
import { TestQuestionState, TestResultSummary } from "../../types/test";
import { Timer, Flag, ChevronLeft, ChevronRight, CheckCircle, RotateCcw } from "lucide-react";

export default function MockArenaPage() {
  const questions = SEED_QUESTIONS;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180 * 60); // 3-hour NEET mock default
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Initialize test question response tracker
  const [userState, setUserState] = useState<Record<string, TestQuestionState>>(() => {
    const initial: Record<string, TestQuestionState> = {};
    questions.forEach((q) => {
      initial[q.id] = {
        questionId: q.id,
        selectedOptionId: null,
        isMarkedForReview: false,
        timeSpentSeconds: 0,
      };
    });
    return initial;
  });

  // Countdown timer
  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted, timeLeft]);

  const formatTimer = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const currentQ = questions[currentIndex];
  const currentState = userState[currentQ.id];

  const handleSelectOption = (optionId: string) => {
    setUserState((prev) => ({
      ...prev,
      [currentQ.id]: {
        ...prev[currentQ.id],
        selectedOptionId: prev[currentQ.id]?.selectedOptionId === optionId ? null : optionId,
      },
    }));
  };

  const handleToggleReview = () => {
    setUserState((prev) => ({
      ...prev,
      [currentQ.id]: {
        ...prev[currentQ.id],
        isMarkedForReview: !prev[currentQ.id]?.isMarkedForReview,
      },
    }));
  };

  // Evaluation engine (+4 for correct, -1 for incorrect)
  const calculateResults = (): TestResultSummary => {
    let correct = 0;
    let incorrect = 0;
    let attempted = 0;

    questions.forEach((q) => {
      const selected = userState[q.id]?.selectedOptionId;
      if (selected) {
        attempted += 1;
        const correctOpt = q.options.find((o) => o.isCorrect)?.id;
        if (selected === correctOpt) {
          correct += 1;
        } else {
          incorrect += 1;
        }
      }
    });

    const score = correct * 4 - incorrect * 1;
    const unattempted = questions.length - attempted;
    const accuracyPercentage = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;

    return {
      totalQuestions: questions.length,
      attempted,
      correct,
      incorrect,
      unattempted,
      score,
      accuracyPercentage,
    };
  };

  if (isSubmitted) {
    const summary = calculateResults();
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white border border-sage-200 rounded-2xl p-8 text-center space-y-4 shadow-sm">
          <div className="inline-flex p-3 rounded-2xl bg-emerald-50 text-emerald-600">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-sage-900">Mock Exam Completed</h2>
          <p className="text-sm text-sage-600">Performance report evaluated under standard NEET rules</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-sage-50 border border-sage-100">
              <span className="text-xs text-sage-600 block">Total Score</span>
              <span className="text-2xl font-bold text-sage-900">{summary.score}</span>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
              <span className="text-xs text-emerald-700 block">Correct (+4)</span>
              <span className="text-2xl font-bold text-emerald-700">{summary.correct}</span>
            </div>
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-100">
              <span className="text-xs text-rose-700 block">Incorrect (-1)</span>
              <span className="text-2xl font-bold text-rose-700">{summary.incorrect}</span>
            </div>
            <div className="p-4 rounded-xl bg-sage-50 border border-sage-100">
              <span className="text-xs text-sage-600 block">Accuracy</span>
              <span className="text-2xl font-bold text-sage-900">{summary.accuracyPercentage}%</span>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => {
                setIsSubmitted(false);
                setCurrentIndex(0);
                setTimeLeft(180 * 60);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sage-500 text-white text-sm font-medium hover:bg-sage-600 transition"
            >
              <RotateCcw className="w-4 h-4" />
              Retake Mock Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top CBT Navigation Bar */}
      <div className="bg-white border border-sage-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-sage-100 text-sage-800">
            NEET Full Mock Simulator
          </span>
          <h2 className="text-sm font-bold text-sage-900 mt-1">Section: {currentQ.subject}</h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sage-50 border border-sage-200 font-mono text-sm font-bold text-sage-800">
            <Timer className="w-4 h-4 text-sage-600" />
            <span>{formatTimer(timeLeft)}</span>
          </div>

          <button
            onClick={() => setIsSubmitted(true)}
            className="px-4 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition"
          >
            Submit Test
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left: Question Workspace */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white border border-sage-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-sage-100 pb-3">
              <span className="text-sm font-bold text-sage-900">
                Question {currentIndex + 1} of {questions.length}
              </span>
              <button
                onClick={handleToggleReview}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-medium transition ${
                  currentState?.isMarkedForReview
                    ? "bg-amber-50 border-amber-300 text-amber-700"
                    : "border-sage-200 text-sage-600 hover:bg-sage-50"
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                {currentState?.isMarkedForReview ? "Marked for Review" : "Mark for Review"}
              </button>
            </div>

            <div className="text-sage-900 font-medium text-base leading-relaxed">
              {currentQ.questionText}
            </div>

            <div className="grid grid-cols-1 gap-3">
              {currentQ.options.map((opt) => {
                const isSelected = currentState?.selectedOptionId === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full text-left flex items-start gap-3 p-4 rounded-xl border transition ${
                      isSelected
                        ? "border-sage-500 bg-sage-50 text-sage-900 font-medium"
                        : "border-sage-200 bg-white hover:bg-sage-50 text-sage-800"
                    }`}
                  >
                    <span
                      className={`flex-shrink-0 w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center border ${
                        isSelected
                          ? "bg-sage-500 text-white border-sage-500"
                          : "bg-sage-100 text-sage-700 border-sage-200"
                      }`}
                    >
                      {opt.id}
                    </span>
                    <span className="text-sm pt-0.5">{opt.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Control Bar */}
          <div className="flex items-center justify-between">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-sage-200 text-xs font-semibold text-sage-700 bg-white disabled:opacity-40 hover:bg-sage-50 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <button
              disabled={currentIndex === questions.length - 1}
              onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sage-500 text-white text-xs font-semibold hover:bg-sage-600 disabled:opacity-40 transition"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Question Palette Navigator */}
        <div className="bg-white border border-sage-200 rounded-2xl p-5 shadow-sm space-y-4 h-fit">
          <h3 className="text-xs font-bold text-sage-900 uppercase tracking-wider">Question Palette</h3>

          <div className="grid grid-cols-4 gap-2">
            {questions.map((q, idx) => {
              const state = userState[q.id];
              const isAnswered = state?.selectedOptionId !== null;
              const isMarked = state?.isMarkedForReview;
              const isCurrent = idx === currentIndex;

              let paletteStyle = "border-sage-200 text-sage-700 bg-sage-50";
              if (isMarked) {
                paletteStyle = "border-amber-400 bg-amber-100 text-amber-900 font-bold";
              } else if (isAnswered) {
                paletteStyle = "border-emerald-500 bg-emerald-500 text-white font-bold";
              }

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-9 rounded-lg border text-xs font-medium flex items-center justify-center transition ${paletteStyle} ${
                    isCurrent ? "ring-2 ring-sage-900 ring-offset-1" : ""
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-sage-100 space-y-2 text-[11px] text-sage-600">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-emerald-500" />
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-amber-200 border border-amber-400" />
              <span>Marked for Review</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-sage-50 border border-sage-200" />
              <span>Unvisited / Unanswered</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}