"use client";

import React, { useState } from "react";
import { PersonalQuestion } from "../../types/notebook";
import { Subject, Difficulty } from "../../types/question";
import { 
  Bookmark, 
  Plus, 
  Image as ImageIcon, 
  Trash2, 
  FileText, 
  Tag, 
  CheckCircle2, 
  Sparkles 
} from "lucide-react";

export default function NotebookPage() {
  const [questions, setQuestions] = useState<PersonalQuestion[]>([
    {
      id: "NOTE-001",
      subject: "BIOLOGY",
      chapter: "Morphology of Flowering Plants",
      topic: "Placentation Types",
      questionText: "Which type of placentation is observed in Dianthus and Primrose?",
      questionType: "MCQ",
      options: [
        { id: "A", text: "Basal", isCorrect: false },
        { id: "B", text: "Free Central", isCorrect: true },
        { id: "C", text: "Parietal", isCorrect: false },
        { id: "D", text: "Axile", isCorrect: false },
      ],
      explanation: "In Dianthus and Primrose, ovules are borne on central axis and septa are absent (Free Central placentation).",
      difficulty: "EASY",
      personalNotes: "Frequently confused with Argemone/Mustard (which is Parietal). Remember DP = Free Central.",
      createdAt: "2026-09-01",
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [subject, setSubject] = useState<Subject>("BIOLOGY");
  const [chapter, setChapter] = useState("");
  const [topic, setTopic] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [notes, setNotes] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("MEDIUM");

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim() || !chapter.trim()) return;

    const newEntry: PersonalQuestion = {
      id: `NOTE-${Date.now().toString().slice(-4)}`,
      subject,
      chapter,
      topic: topic || "General",
      questionText,
      questionType: "MCQ",
      options: [
        { id: "A", text: "Option A", isCorrect: true },
        { id: "B", text: "Option B", isCorrect: false },
        { id: "C", text: "Option C", isCorrect: false },
        { id: "D", text: "Option D", isCorrect: false },
      ],
      explanation: "Self-curated notebook entry.",
      difficulty,
      personalNotes: notes,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setQuestions([newEntry, ...questions]);
    setIsAdding(false);
    setChapter("");
    setTopic("");
    setQuestionText("");
    setNotes("");
  };

  const handleDelete = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-sage-900">Personal Question Notebook</h1>
          <p className="text-xs text-sage-600">
            Save tricky classroom problems, textbook screenshots, and personal mnemonic notes
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sage-500 text-white text-xs font-semibold hover:bg-sage-600 shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>{isAdding ? "Close Form" : "Add Custom Question"}</span>
        </button>
      </div>

      {/* Upload / Create Form */}
      {isAdding && (
        <form
          onSubmit={handleSaveQuestion}
          className="bg-white border border-sage-200 rounded-2xl p-6 shadow-sm space-y-4"
        >
          <h3 className="text-sm font-bold text-sage-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sage-500" />
            Curate New Problem
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-sage-700 block mb-1">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value as Subject)}
                className="w-full text-xs p-2.5 bg-sage-50 border border-sage-200 rounded-xl text-sage-900 focus:outline-none"
              >
                <option value="BIOLOGY">Biology</option>
                <option value="PHYSICS">Physics</option>
                <option value="CHEMISTRY">Chemistry</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-sage-700 block mb-1">Chapter Name</label>
              <input
                type="text"
                required
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                placeholder="e.g. Thermodynamics"
                className="w-full text-xs p-2.5 bg-sage-50 border border-sage-200 rounded-xl text-sage-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-sage-700 block mb-1">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                className="w-full text-xs p-2.5 bg-sage-50 border border-sage-200 rounded-xl text-sage-900 focus:outline-none"
              >
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-sage-700 block mb-1">Question Text or Equation</label>
            <textarea
              required
              rows={3}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Type the question stem or paste OCR output..."
              className="w-full text-xs p-3 bg-sage-50 border border-sage-200 rounded-xl text-sage-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-sage-700 block mb-1">Personal Memory Hint / Formula Note</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Remember minus sign in work done by gas"
              className="w-full text-xs p-2.5 bg-sage-50 border border-sage-200 rounded-xl text-sage-900 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-xs font-semibold text-sage-600 hover:bg-sage-50 rounded-xl border border-sage-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-sage-500 hover:bg-sage-600 rounded-xl"
            >
              Save to Notebook
            </button>
          </div>
        </form>
      )}

      {/* Notebook Cards Stream */}
      <div className="space-y-4">
        {questions.length === 0 ? (
          <div className="text-center py-16 bg-white border border-sage-200 rounded-2xl">
            <Bookmark className="w-8 h-8 text-sage-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-sage-800">Your notebook is empty</p>
            <p className="text-xs text-sage-500 mt-1">Upload or jot down high-yield questions for personalized recall[cite: 1]</p>
          </div>
        ) : (
          questions.map((q) => (
            <div
              key={q.id}
              className="bg-white border border-sage-200 rounded-2xl p-6 shadow-sm space-y-3 hover:border-sage-300 transition"
            >
              <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sage-900 bg-sage-100 px-2.5 py-0.5 rounded-md">
                    {q.subject}
                  </span>
                  <span className="font-medium text-sage-700">{q.chapter}</span>
                  <span className="text-sage-300">•</span>
                  <span className="text-sage-500">{q.topic}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-sage-500">{q.createdAt}</span>
                  <button
                    onClick={() => handleDelete(q.id)}
                    className="p-1 text-sage-400 hover:text-rose-600 transition"
                    title="Delete Entry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-sm font-medium text-sage-900 leading-relaxed">
                {q.questionText}
              </p>

              {q.personalNotes && (
                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl flex items-start gap-2.5">
                  <FileText className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-900 font-medium leading-relaxed">
                    <strong className="text-amber-950 font-bold">Mnemonic / Personal Note:</strong>{" "}
                    {q.personalNotes}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}