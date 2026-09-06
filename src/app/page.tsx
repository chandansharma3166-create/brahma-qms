"use client";

import React from "react";
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

export default function DashboardPage() {
  const router = useRouter();

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
            You have <strong className="text-sage-900 font-bold">18 questions</strong> due for spaced revision today. Keep the memory retention high.
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
          <div className="text-2xl font-bold text-sage-900">76.4%</div>
          <span className="text-[11px] text-emerald-600 font-semibold block">
            +2.1% from last week
          </span>
        </div>

        <div className="bg-white border border-sage-200 rounded-2xl p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-sage-500 font-medium">
            <span>Questions Solved</span>
            <CheckCircle2 className="w-4 h-4 text-sage-400" />
          </div>
          <div className="text-2xl font-bold text-sage-900">3,540</div>
          <span className="text-[11px] text-sage-500 font-medium block">
            Goal: 5,000 before test series
          </span>
        </div>

        <div className="bg-white border border-sage-200 rounded-2xl p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-sage-500 font-medium">
            <span>Avg Speed / Question</span>
            <Zap className="w-4 h-4 text-sage-400" />
          </div>
          <div className="text-2xl font-bold text-sage-900">54s</div>
          <span className="text-[11px] text-sage-500 font-medium block">
            Target: &lt; 50s for Biology
          </span>
        </div>

        <div className="bg-white border border-sage-200 rounded-2xl p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-sage-500 font-medium">
            <span>Revision Queue</span>
            <RotateCcw className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-amber-600">18 Due</div>
          <span className="text-[11px] text-rose-600 font-medium block">
            4 High-yield mistakes
          </span>
        </div>
      </div>

      {/* Subject Domain Cards */}
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
                  84% Acc.
                </span>
              </div>
              <h3 className="text-sm font-bold text-sage-900">Biology</h3>
              <p className="text-xs text-sage-500">Botany &amp; Zoology</p>
              
              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between text-[11px] font-semibold text-sage-600">
                  <span>Topic Mastery</span>
                  <span>72%</span>
                </div>
                <div className="w-full h-1.5 bg-sage-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "72%" }} />
                </div>
              </div>
            </div>

            <Link
              href="/explorer"
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
                  68% Acc.
                </span>
              </div>
              <h3 className="text-sm font-bold text-sage-900">Physics</h3>
              <p className="text-xs text-sage-500">Mechanics &amp; Modern</p>
              
              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between text-[11px] font-semibold text-sage-600">
                  <span>Topic Mastery</span>
                  <span>54%</span>
                </div>
                <div className="w-full h-1.5 bg-sage-100 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-600 rounded-full" style={{ width: "54%" }} />
                </div>
              </div>
            </div>

            <Link
              href="/explorer"
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
                  76% Acc.
                </span>
              </div>
              <h3 className="text-sm font-bold text-sage-900">Chemistry</h3>
              <p className="text-xs text-sage-500">Organic &amp; Physical</p>
              
              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between text-[11px] font-semibold text-sage-600">
                  <span>Topic Mastery</span>
                  <span>65%</span>
                </div>
                <div className="w-full h-1.5 bg-sage-100 rounded-full overflow-hidden">
                  <div className="h-full bg-sage-500 rounded-full" style={{ width: "65%" }} />
                </div>
              </div>
            </div>

            <Link
              href="/explorer"
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