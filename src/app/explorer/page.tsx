"use client";

import React, { useState, useMemo, useEffect } from "react";
import { SEED_QUESTIONS } from "../../data/seedQuestions";
import QuestionCard from "../../components/QuestionCard";
import { Search, Layers } from "lucide-react";
import { Subject, Difficulty, Question } from "../../types/question";

export default function QuestionExplorerPage() {
  const [allQuestions, setAllQuestions] = useState<Question[]>(SEED_QUESTIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<Subject | "ALL">("ALL");
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | "ALL">("ALL");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("brahma_notebook_entries");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setAllQuestions([...parsed, ...SEED_QUESTIONS]);
          }
        } catch (e) {
          console.error("Failed to parse custom questions:", e);
        }
      }
    }
  }, []);

  const filteredQuestions = useMemo(() => {
    return allQuestions.filter((q) => {
      const matchSubject = selectedSubject === "ALL" || q.subject === selectedSubject;
      const matchDiff = selectedDifficulty === "ALL" || q.difficulty === selectedDifficulty;
      const matchSearch =
        searchQuery === "" ||
        q.questionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (q.chapter && q.chapter.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (q.topic && q.topic.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchSubject && matchDiff && matchSearch;
    });
  }, [allQuestions, searchQuery, selectedSubject, selectedDifficulty]);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-sage-900">Question Explorer</h1>
        <p className="text-xs text-sage-600">Curated high-yield bank with real-time NCERT explanations</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-sage-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-sage-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by chapter, keyword, or topic..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-sage-50 border border-sage-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-sage-500 text-sage-900 placeholder:text-sage-400"
          />
        </div>

        {/* Subject Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value as Subject | "ALL")}
            className="px-3 py-2 text-xs font-medium bg-sage-50 border border-sage-200 rounded-xl text-sage-800 focus:outline-none"
          >
            <option value="ALL">All Subjects</option>
            <option value="BIOLOGY">Biology</option>
            <option value="PHYSICS">Physics</option>
            <option value="CHEMISTRY">Chemistry</option>
          </select>

          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value as Difficulty | "ALL")}
            className="px-3 py-2 text-xs font-medium bg-sage-50 border border-sage-200 rounded-xl text-sage-800 focus:outline-none"
          >
            <option value="ALL">All Difficulties</option>
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-sage-600 px-1">
        <span className="flex items-center gap-1.5 font-medium">
          <Layers className="w-3.5 h-3.5 text-sage-500" />
          Showing {filteredQuestions.length} Questions
        </span>
      </div>

      {/* Question Stream */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-16 bg-white border border-sage-200 rounded-2xl">
            <p className="text-sm font-semibold text-sage-800">No questions matched your filters</p>
            <p className="text-xs text-sage-500 mt-1">Try clearing your search query or subject filters</p>
          </div>
        ) : (
          filteredQuestions.map((q, idx) => (
            <QuestionCard key={q.id || idx} question={q} index={idx} />
          ))
        )}
      </div>
    </div>
  );
}