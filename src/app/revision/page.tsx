"use client";

import React, { useState } from "react";
import { SEED_QUESTIONS } from "../../data/seedQuestions";
import QuestionCard from "../../components/QuestionCard";
import { RotateCcw, AlertTriangle, CheckCircle, Calendar } from "lucide-react";

export default function RevisionCenterPage() {
  const [activeTab, setActiveTab] = useState<"DUE" | "MISTAKES">("DUE");

  // Filter seed questions to emulate revision categories
  const dueQuestions = SEED_QUESTIONS.filter((q) => q.difficulty !== "EASY");
  const mistakeQuestions = SEED_QUESTIONS.filter((q) => q.difficulty === "HARD");

  const displayList = activeTab === "DUE" ? dueQuestions : mistakeQuestions;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-sage-900">Revision Center</h1>
        <p className="text-xs text-sage-600">
          Automated spaced-repetition queue and mistake notebook
        </p>
      </div>

      {/* Mode Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => setActiveTab("DUE")}
          className={`p-4 rounded-2xl border text-left transition ${
            activeTab === "DUE"
              ? "bg-white border-sage-500 shadow-sm"
              : "bg-sage-50 border-sage-200 hover:bg-white"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="p-2 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
              <RotateCcw className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-amber-700">
              {dueQuestions.length} Questions
            </span>
          </div>
          <h3 className="text-sm font-bold text-sage-900">Due Today</h3>
          <p className="text-xs text-sage-600 mt-0.5">
            Spaced repetition queue ready for retention review
          </p>
        </button>

        <button
          onClick={() => setActiveTab("MISTAKES")}
          className={`p-4 rounded-2xl border text-left transition ${
            activeTab === "MISTAKES"
              ? "bg-white border-sage-500 shadow-sm"
              : "bg-sage-50 border-sage-200 hover:bg-white"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="p-2 rounded-lg bg-rose-50 text-rose-700 border border-rose-200">
              <AlertTriangle className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-rose-700">
              {mistakeQuestions.length} Questions
            </span>
          </div>
          <h3 className="text-sm font-bold text-sage-900">Mistake Notebook</h3>
          <p className="text-xs text-sage-600 mt-0.5">
            Questions flagged with repeated conceptual errors
          </p>
        </button>
      </div>

      {/* Queue Header */}
      <div className="flex items-center justify-between text-xs text-sage-600 px-1 pt-2">
        <div className="flex items-center gap-1.5 font-medium">
          <Calendar className="w-3.5 h-3.5 text-sage-500" />
          <span>Active Queue: {activeTab === "DUE" ? "Due Today" : "Mistake Notebook"}</span>
        </div>
      </div>

      {/* Question Stream */}
      <div className="space-y-4">
        {displayList.map((q, idx) => (
          <QuestionCard key={q.id} question={q} index={idx} />
        ))}
      </div>
    </div>
  );
}