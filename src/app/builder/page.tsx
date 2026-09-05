"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Subject, Difficulty } from "../../types/question";
import { 
  Sliders, 
  Sparkles, 
  Clock, 
  HelpCircle, 
  ShieldAlert, 
  ArrowRight,
  Check
} from "lucide-react";

export default function TestBuilderPage() {
  const router = useRouter();

  const [title, setTitle] = useState("Custom NEET Drill");
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>(["BIOLOGY", "PHYSICS", "CHEMISTRY"]);
  const [questionCount, setQuestionCount] = useState(45);
  const [duration, setDuration] = useState(60);
  const [negativeMarking, setNegativeMarking] = useState(true);
  const [difficulty, setDifficulty] = useState<Difficulty | "MIXED">("MIXED");

  const toggleSubject = (sub: Subject) => {
    if (selectedSubjects.includes(sub)) {
      if (selectedSubjects.length > 1) {
        setSelectedSubjects(selectedSubjects.filter((s) => s !== sub));
      }
    } else {
      setSelectedSubjects([...selectedSubjects, sub]);
    }
  };

  const handleLaunch = (e: React.FormEvent) => {
    e.preventDefault();
    // Launch directly into Mock Test Arena
    router.push("/mock");
  };

  const presetTemplates = [
    { label: "High-Yield Biology Sprint", qCount: 45, time: 45, sub: ["BIOLOGY"] as Subject[] },
    { label: "Physics Formula Workout", qCount: 30, time: 45, sub: ["PHYSICS"] as Subject[] },
    { label: "Full 180Q Simulation", qCount: 180, time: 200, sub: ["BIOLOGY", "PHYSICS", "CHEMISTRY"] as Subject[] },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-sage-900">Custom Test Builder</h1>
        <p className="text-xs text-sage-600">
          Configure adaptive question sets, subject splits, and negative marking constraints[cite: 1]
        </p>
      </div>

      {/* Preset Action Bar */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-sage-700">Quick-Start Templates:</span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {presetTemplates.map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                setTitle(preset.label);
                setQuestionCount(preset.qCount);
                setDuration(preset.time);
                setSelectedSubjects(preset.sub);
              }}
              className="p-3.5 rounded-xl border border-sage-200 bg-white hover:border-sage-500 hover:shadow-sm text-left transition flex items-center justify-between"
            >
              <div>
                <h4 className="text-xs font-bold text-sage-900">{preset.label}</h4>
                <p className="text-[11px] text-sage-600 mt-0.5">
                  {preset.qCount} Qs • {preset.time} mins
                </p>
              </div>
              <Sparkles className="w-3.5 h-3.5 text-sage-500" />
            </button>
          ))}
        </div>
      </div>

      {/* Custom Configuration Panel */}
      <form
        onSubmit={handleLaunch}
        className="bg-white border border-sage-200 rounded-2xl p-6 shadow-sm space-y-6"
      >
        <div className="space-y-4 border-b border-sage-100 pb-5">
          <label className="text-xs font-bold text-sage-900 block">Assessment Name</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-sm p-3 bg-sage-50 border border-sage-200 rounded-xl text-sage-900 focus:outline-none"
          />
        </div>

        {/* Subjects Split */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-sage-900 block">Target Subjects</label>
          <div className="grid grid-cols-3 gap-3">
            {(["BIOLOGY", "PHYSICS", "CHEMISTRY"] as Subject[]).map((sub) => {
              const isSelected = selectedSubjects.includes(sub);
              return (
                <button
                  type="button"
                  key={sub}
                  onClick={() => toggleSubject(sub)}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition ${
                    isSelected
                      ? "border-sage-500 bg-sage-50 text-sage-900"
                      : "border-sage-200 bg-white text-sage-500 hover:bg-sage-50"
                  }`}
                >
                  <span>{sub}</span>
                  {isSelected && <Check className="w-4 h-4 text-sage-600" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Difficulty Distribution */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-sage-900 block">Difficulty Profile</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {(["MIXED", "EASY", "MEDIUM", "HARD"] as const).map((lvl) => (
              <button
                type="button"
                key={lvl}
                onClick={() => setDifficulty(lvl)}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold transition ${
                  difficulty === lvl
                    ? "bg-sage-500 text-white border-sage-500"
                    : "bg-sage-50 border-sage-200 text-sage-700 hover:bg-white"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Sliders for Duration & Count */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-sage-900">
              <span className="flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-sage-500" />
                Question Count
              </span>
              <span>{questionCount} Questions</span>
            </div>
            <input
              type="range"
              min={10}
              max={180}
              step={5}
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="w-full accent-sage-600"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-sage-900">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sage-500" />
                Time Limit
              </span>
              <span>{duration} Minutes</span>
            </div>
            <input
              type="range"
              min={15}
              max={200}
              step={5}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full accent-sage-600"
            />
          </div>
        </div>

        {/* Negative Marking Flag */}
        <div className="pt-2 border-t border-sage-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <div>
              <span className="text-xs font-bold text-sage-900 block">NEET Marking Scheme</span>
              <span className="text-[11px] text-sage-600 block">+4 for correct, -1 for wrong answers</span>
            </div>
          </div>
          <input
            type="checkbox"
            checked={negativeMarking}
            onChange={(e) => setNegativeMarking(e.target.checked)}
            className="w-4 h-4 accent-sage-600 rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-sage-500 hover:bg-sage-600 text-white font-semibold text-xs tracking-wide flex items-center justify-center gap-2 shadow-sm transition"
        >
          <span>Generate and Launch Assessment</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}