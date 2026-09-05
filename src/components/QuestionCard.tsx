"use client";

import React, { useState } from "react";
import { Question } from "../types/question";
import { CheckCircle2, XCircle, ChevronDown, ChevronUp, Bookmark, Sparkles } from "lucide-react";

interface QuestionCardProps {
  question: Question;
  index: number;
}

export default function QuestionCard({ question, index }: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleSelect = (optionId: string) => {
    if (selectedOption) return; // Prevent changing after submission
    setSelectedOption(optionId);
    setShowExplanation(true);
  };

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case "EASY":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "MEDIUM":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "HARD":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-sage-50 text-sage-700 border-sage-200";
    }
  };

  return (
    <div className="bg-white border border-sage-200 rounded-2xl p-6 shadow-sm space-y-4 hover:border-sage-300 transition">
      {/* Question Header Metadata */}
      <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sage-900 bg-sage-100 px-2.5 py-1 rounded-md">
            Q{index + 1}
          </span>
          <span className="text-sage-600 font-medium">{question.chapter}</span>
          <span className="text-sage-300">•</span>
          <span className="text-sage-600">{question.topic}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-semibold ${getDifficultyBadge(question.difficulty)}`}>
            {question.difficulty}
          </span>
          {question.source && (
            <span className="px-2 py-0.5 rounded-md bg-sage-50 text-sage-600 border border-sage-200 text-[11px]">
              {question.source}
            </span>
          )}
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`p-1.5 rounded-lg border transition ${
              bookmarked ? "bg-amber-50 border-amber-300 text-amber-600" : "border-sage-200 text-sage-400 hover:text-sage-600"
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>
      </div>

      {/* Stem */}
      <div className="text-sage-900 font-medium text-base leading-relaxed">
        {question.questionText}
      </div>

      {/* Options List */}
      <div className="grid grid-cols-1 gap-2.5 pt-2">
        {question.options.map((opt) => {
          const isSelected = selectedOption === opt.id;
          const isCorrect = opt.isCorrect;

          let btnStyle = "border-sage-200 bg-white hover:bg-sage-50 text-sage-900";
          if (selectedOption) {
            if (isCorrect) {
              btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-medium";
            } else if (isSelected && !isCorrect) {
              btnStyle = "border-rose-400 bg-rose-50 text-rose-900";
            } else {
              btnStyle = "border-sage-100 bg-white opacity-60 text-sage-600";
            }
          }

          return (
            <button
              key={opt.id}
              disabled={selectedOption !== null}
              onClick={() => handleSelect(opt.id)}
              className={`w-full text-left flex items-start gap-3 p-3.5 rounded-xl border transition ${btnStyle}`}
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-lg border border-sage-300 bg-sage-50 text-sage-700 text-xs font-semibold flex items-center justify-center">
                {opt.id}
              </span>
              <span className="flex-1 text-sm pt-0.5">{opt.text}</span>
              {selectedOption && isCorrect && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              )}
              {selectedOption && isSelected && !isCorrect && (
                <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Toggle Drawer */}
      {selectedOption && (
        <div className="pt-3 border-t border-sage-100">
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="flex items-center gap-1.5 text-xs font-semibold text-sage-600 hover:text-sage-800 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-sage-500" />
            <span>{showExplanation ? "Hide Explanation" : "View NCERT Explanation"}</span>
            {showExplanation ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showExplanation && (
            <div className="mt-3 p-4 rounded-xl bg-sage-50 border border-sage-200 text-xs text-sage-800 leading-relaxed">
              <strong className="block font-semibold text-sage-900 mb-1">Concept Clarification:</strong>
              {question.explanation}
            </div>
          )}
        </div>
      )}
    </div>
  );
}