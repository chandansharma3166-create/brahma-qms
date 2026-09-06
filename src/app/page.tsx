"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  RotateCcw, 
  Target, 
  CheckCircle2, 
  Zap, 
  ArrowRight, 
  BookOpen, 
  Atom, 
  FlaskConical, 
  Sliders 
} from "lucide-react";

interface MockRecord {
  id?: string;
  date?: string;
  subject?: string;
  score: number;
  accuracy: number;
  total: number;
  correct: number;
  incorrect: number;
  timeSpentSeconds?: number;
}

interface SubjectStat {
  accuracy: number;
  mastery: number;
  attempted: number;
}

export default function DashboardPage() {
  const router = useRouter();

  // Top Metrics
  const [overallAccuracy, setOverallAccuracy] = useState<number>(76.4);
  const [totalSolved, setTotalSolved] = useState<number>(3540);
  const [avgSpeed, setAvgSpeed] = useState<string>("54s");
  const [revisionDue, setRevisionDue] = useState<number>(18);
  const [isDynamic, setIsDynamic] = useState<boolean>(false);

  // Per-Subject Metrics
  const [subjectStats, setSubjectStats] = useState<Record<string, SubjectStat>>({
    BIOLOGY: { accuracy: 84, mastery: 72, attempted: 1420 },
    PHYSICS: { accuracy: 68, mastery: 54, attempted: 980 },
    CHEMISTRY: { accuracy: 76, mastery: 65, attempted: 1140 },
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Parse Mock Test History
    const mockRaw = localStorage.getItem("brahma_mock_history");
    const notebookRaw = localStorage.getItem("brahma_notebook_entries");

    let history: MockRecord[] = [];
    let notebookCount = 0;

    if (mockRaw) {
      try {
        const parsed = JSON.parse(mockRaw);
        if (Array.isArray(parsed)) history = parsed;
      } catch (e) {
        console.error("Failed to parse mock history", e);
      }
    }

    if (notebookRaw) {
      try {
        const parsedNotebook = JSON.parse(notebookRaw);
        if (Array.isArray(parsedNotebook)) notebookCount = parsedNotebook.length;
      } catch (e) {
        console.error("Failed to parse notebook", e);
      }
    }

    // 2. Aggregate Data if Tests Have Been Attempted
    if (history.length > 0) {
      setIsDynamic(true);

      let totalCorrectAll = 0;
      let totalQuestionsAll = 0;
      let totalAttemptsAll = 0;
      let totalSecondsAll = 0;

      const subjectBreakdown: Record<string, { correct: number; attempted: number; totalQ: number }> = {
        BIOLOGY: { correct: 0, attempted: 0, totalQ: 0 },
        PHYSICS: { correct: 0, attempted: 0, totalQ: 0 },
        CHEMISTRY: { correct: 0, attempted: 0, totalQ: 0 },
      };

      history.forEach((test) => {
        const qCount = test.total || 0;
        const correct = test.correct || 0;
        const attempted = (test.correct || 0) + (test.incorrect || 0);

        totalCorrectAll += correct;
        totalAttemptsAll += attempted;
        totalQuestionsAll += qCount;
        totalSecondsAll += test.timeSpentSeconds || attempted * 54;

        const sub = (test.subject || "BIOLOGY").toUpperCase();
        if (subjectBreakdown[sub]) {
          subjectBreakdown[sub].correct += correct;
          subjectBreakdown[sub].attempted += attempted;
          subjectBreakdown[sub].totalQ += qCount;
        }
      });

      // Update Top Metrics
      if (totalAttemptsAll > 0) {
        setOverallAccuracy(Math.round((totalCorrectAll / totalAttemptsAll) * 1000) / 10);
        setTotalSolved(totalQuestionsAll);
        const calculatedSpeed = Math.round(totalSecondsAll / totalAttemptsAll);
        setAvgSpeed(`${calculatedSpeed > 0 ? calculatedSpeed : 54}s`);
      }

      if (notebookCount > 0) {
        setRevisionDue(notebookCount);
      }

      // Update Subject Cards
      const newSubStats = { ...subjectStats };
      (["BIOLOGY", "PHYSICS", "CHEMISTRY"] as const).forEach((sub) => {
        const data = subjectBreakdown[sub];
        if (data.attempted > 0) {
          const acc = Math.round((data.correct / data.attempted) * 100);
          // Mastery is weighted by accuracy and volume
          const mastery = Math.min(100, Math.round(acc * 0.85 + Math.min(15, data.attempted * 0.5)));
          newSubStats[sub] = {
            accuracy: acc,
            mastery: mastery,
            attempted: data.attempted,
          };
        }
      });
      setSubjectStats(newSubStats);
    } else if (notebookCount > 0) {
      setRevisionDue(notebookCount);
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Welcome Banner */}
      <div className="bg-white border border-sage-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-[11px] font-bold bg-sage-100 text-sage-800 rounded-lg">
              🎯 NEET 2027 Mission
            </span>
            <span className="px-2.5 py-1 text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200 rounded-lg">
              🔥 12 Day Streak
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-sage-900">
            Welcome back, Aspirant
          </h1>
          <p className="text-xs sm:text-sm text-sage-600 max-w-xl">
            You have <strong className="text-sage-900 font-bold">{revisionDue} questions</strong> due for spaced revision today. Keep the memory retention high.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full md:w-auto z-10 relative">
          <button
            type="button"
            onClick={() => router.push("/revision")}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-sage-500 hover:bg-sage-600 text-white text-xs font-bold shadow-xs transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Start Revision</span>
          </button>
          <button
            type="button"
            onClick={() => router.push("/builder")}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-sage-300 hover:bg-sage-50 text-sage-800 text-xs font-bold transition cursor-pointer"
          >
            <Sliders className="w-4 h-4" />
            <span>Test Builder</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-sage-200 rounded-2xl p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-sage-500 font-medium">
            <span>Overall Accuracy</span>
            <Target className="w-4 h-4 text-sage-400" />
          </div>
          <div className="text-2xl font-bold text-sage-900">{overallAccuracy}%</div>
          <span className="text-[11px] text-emerald-600 font-semibold block">
            {isDynamic ? "Live test performance" : "+2.1% from last week"}
          </span>
        </div>

        <div className="bg-white border border-sage-200 rounded-2xl p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-sage-500 font-medium">
            <span>Questions Solved</span>
            <CheckCircle2 className="w-4 h-4 text-sage-400" />
          </div>
          <div className="text-2xl font-bold text-sage-900">{totalSolved.toLocaleString()}</div>
          <span className="text-[11px] text-sage-500 font-medium block">
            {isDynamic ? "Tracked in mock arena" : "Goal: 5,000 before test series"}
          </span>
        </div>

        <div className="bg-white border border-sage-200 rounded-2xl p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-sage-500 font-medium">
            <span>Avg Speed / Question</span>
            <Zap className="w-4 h-4 text-sage-400" />
          </div>
          <div className="text-2xl font-bold text-sage-900">{avgSpeed}</div>
          <span className="text-[11px] text-sage-500 font-medium block">
            Target: &lt; 50s for Biology
          </span>
        </div>

        <div className="bg-white border border-sage-200 rounded-2xl p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-sage-500 font-medium">
            <span>Revision Queue</span>
            <RotateCcw className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-amber-600">{revisionDue} Due</div>
          <span className="text-[11px] text-rose-600 font-medium block">
            {isDynamic ? "From notebook & mistakes" : "4 High-yield mistakes"}
          </span>
        </div>
      </div>

      {/* Dynamic NEET Subjects Cards */}
      <div className="space-y-3">
        <div>
          <h2 className="text-base font-bold text-sage-900">NEET Subjects</h2>
          <p className="text-xs text-sage-600">Track mastery by subject domain</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Biology */}
          <div className="bg-white border border-sage-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <BookOpen className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                  {subjectStats.BIOLOGY.accuracy}% Acc.
                </span>
              </div>
              <h3 className="text-sm font-bold text-sage-900">Biology</h3>
              <p className="text-xs text-sage-500">Botany &amp; Zoology</p>
              
              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between text-[11px] font-semibold text-sage-600">
                  <span>Topic Mastery</span>
                  <span>{subjectStats.BIOLOGY.mastery}%</span>
                </div>
                <div className="w-full h-1.5 bg-sage-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
                    style={{ width: `${subjectStats.BIOLOGY.mastery}%` }} 
                  />
                </div>
              </div>
            </div>

            <Link
              href="/explorer?subject=BIOLOGY"
              className="inline-flex items-center justify-between pt-3 border-t border-sage-100 text-xs font-bold text-sage-700 hover:text-sage-900 transition"
            >
              <span>Enter Practice</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Physics */}
          <div className="bg-white border border-sage-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="p-2 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
                  <Atom className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-lg border border-teal-200">
                  {subjectStats.PHYSICS.accuracy}% Acc.
                </span>
              </div>
              <h3 className="text-sm font-bold text-sage-900">Physics</h3>
              <p className="text-xs text-sage-500">Mechanics &amp; Modern</p>
              
              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between text-[11px] font-semibold text-sage-600">
                  <span>Topic Mastery</span>
                  <span>{subjectStats.PHYSICS.mastery}%</span>
                </div>
                <div className="w-full h-1.5 bg-sage-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-teal-600 rounded-full transition-all duration-500" 
                    style={{ width: `${subjectStats.PHYSICS.mastery}%` }} 
                  />
                </div>
              </div>
            </div>

            <Link
              href="/explorer?subject=PHYSICS"
              className="inline-flex items-center justify-between pt-3 border-t border-sage-100 text-xs font-bold text-sage-700 hover:text-sage-900 transition"
            >
              <span>Enter Practice</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Chemistry */}
          <div className="bg-white border border-sage-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
                  <FlaskConical className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                  {subjectStats.CHEMISTRY.accuracy}% Acc.
                </span>
              </div>
              <h3 className="text-sm font-bold text-sage-900">Chemistry</h3>
              <p className="text-xs text-sage-500">Organic &amp; Physical</p>
              
              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between text-[11px] font-semibold text-sage-600">
                  <span>Topic Mastery</span>
                  <span>{subjectStats.CHEMISTRY.mastery}%</span>
                </div>
                <div className="w-full h-1.5 bg-sage-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-sage-500 rounded-full transition-all duration-500" 
                    style={{ width: `${subjectStats.CHEMISTRY.mastery}%` }} 
                  />
                </div>
              </div>
            </div>

            <Link
              href="/explorer?subject=CHEMISTRY"
              className="inline-flex items-center justify-between pt-3 border-t border-sage-100 text-xs font-bold text-sage-700 hover:text-sage-900 transition"
            >
              <span>Enter Practice</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}