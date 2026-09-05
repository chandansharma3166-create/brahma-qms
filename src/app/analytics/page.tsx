"use client";

import React from "react";
import { 
  BarChart3, 
  Target, 
  Zap, 
  TrendingUp, 
  AlertOctagon, 
  BookOpen, 
  Lightbulb, 
  ArrowUpRight 
} from "lucide-react";

export default function AnalyticsPage() {
  const subjectPerformance = [
    { subject: "Biology", accuracy: 82, attempted: 1420, avgSpeed: "42s", color: "bg-emerald-500" },
    { subject: "Physics", accuracy: 64, attempted: 980, avgSpeed: "75s", color: "bg-teal-600" },
    { subject: "Chemistry", accuracy: 74, attempted: 1140, avgSpeed: "58s", color: "bg-sage-500" },
  ];

  const topicHeatmap = [
    { chapter: "Cell: The Unit of Life", subject: "Biology", mastery: "High", score: 88, band: "bg-emerald-100 text-emerald-800 border-emerald-300" },
    { chapter: "Chemical Bonding", subject: "Chemistry", mastery: "Moderate", score: 71, band: "bg-amber-100 text-amber-800 border-amber-300" },
    { chapter: "Electrostatics", subject: "Physics", mastery: "Low", score: 52, band: "bg-rose-100 text-rose-800 border-rose-300" },
    { chapter: "Genetics & Evolution", subject: "Biology", mastery: "High", score: 85, band: "bg-emerald-100 text-emerald-800 border-emerald-300" },
    { chapter: "Thermodynamics", subject: "Physics", mastery: "Low", score: 48, band: "bg-rose-100 text-rose-800 border-rose-300" },
    { chapter: "Equilibrium", subject: "Chemistry", mastery: "Moderate", score: 66, band: "bg-amber-100 text-amber-800 border-amber-300" },
  ];

  const errorTaxonomy = [
    { type: "Conceptual Gap", count: 42, percentage: 46, desc: "Misapplied fundamental NCERT theory or core principle" },
    { type: "Calculation / Step Error", count: 24, percentage: 26, desc: "Arithmetic error, power of 10, or conversion slip" },
    { type: "Careless / Misread Question", count: 15, percentage: 16, desc: "Missed 'INCORRECT' or 'EXCEPT' in question stem" },
    { type: "Time Pressure Panic", count: 11, percentage: 12, desc: "Rushed submission within the final 30 seconds" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-sage-900">Performance Intelligence</h1>
        <p className="text-xs text-sage-600">
          Cross-subject accuracy, mistake diagnostics, and topic mastery heatmap
        </p>
      </div>

      {/* Top High-Level Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-sage-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-sage-600 text-xs font-semibold mb-2">
            <span>Overall Accuracy</span>
            <Target className="w-4 h-4 text-sage-500" />
          </div>
          <div className="text-2xl font-bold text-sage-900">74.6%</div>
          <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" /> +3.4% this month
          </span>
        </div>

        <div className="bg-white border border-sage-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-sage-600 text-xs font-semibold mb-2">
            <span>Total Questions Solved</span>
            <BookOpen className="w-4 h-4 text-sage-500" />
          </div>
          <div className="text-2xl font-bold text-sage-900">3,540</div>
          <span className="text-[11px] text-sage-600 font-medium mt-1 block">
            Across 42 NEET Chapters
          </span>
        </div>

        <div className="bg-white border border-sage-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-sage-600 text-xs font-semibold mb-2">
            <span>Average Speed</span>
            <Zap className="w-4 h-4 text-sage-500" />
          </div>
          <div className="text-2xl font-bold text-sage-900">54s / Q</div>
          <span className="text-[11px] text-sage-600 font-medium mt-1 block">
            Target: Under 60s
          </span>
        </div>

        <div className="bg-white border border-sage-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-sage-600 text-xs font-semibold mb-2">
            <span>Critical Weak Topics</span>
            <AlertOctagon className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-bold text-rose-600">2 Chapters</div>
          <span className="text-[11px] text-sage-600 font-medium mt-1 block">
            Accuracy below 55%
          </span>
        </div>
      </div>

      {/* Subject Velocity & Accuracy */}
      <div className="bg-white border border-sage-200 rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-sage-900">Subject Diagnostics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {subjectPerformance.map((sub) => (
            <div key={sub.subject} className="p-4 rounded-xl border border-sage-200 bg-sage-50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-sage-900">{sub.subject}</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white text-sage-800 border border-sage-200">
                  {sub.accuracy}% Acc.
                </span>
              </div>
              <div className="w-full bg-sage-200 h-2 rounded-full overflow-hidden">
                <div className={`h-full ${sub.color}`} style={{ width: `${sub.accuracy}%` }} />
              </div>
              <div className="flex justify-between text-[11px] text-sage-600 font-medium">
                <span>{sub.attempted} Attempted</span>
                <span>Avg: {sub.avgSpeed}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Topic Mastery Heatmap */}
        <div className="bg-white border border-sage-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-sage-900">Topic Mastery Heatmap</h2>
            <span className="text-xs text-sage-600">Last 30 Days</span>
          </div>

          <div className="space-y-2.5">
            {topicHeatmap.map((item) => (
              <div
                key={item.chapter}
                className="flex items-center justify-between p-3 rounded-xl border border-sage-100 hover:bg-sage-50 transition"
              >
                <div>
                  <h4 className="text-xs font-bold text-sage-900">{item.chapter}</h4>
                  <span className="text-[11px] text-sage-600">{item.subject}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-sage-800">{item.score}%</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${item.band}`}>
                    {item.mastery}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Error Taxonomy Analysis */}
        <div className="bg-white border border-sage-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-sage-900">Error Taxonomy</h2>
            <span className="text-xs text-sage-600">92 Mistakes Categorized</span>
          </div>

          <div className="space-y-3">
            {errorTaxonomy.map((err) => (
              <div key={err.type} className="p-3 rounded-xl border border-sage-100 bg-sage-50/50 space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-sage-900">{err.type}</span>
                  <span className="font-bold text-sage-700">{err.percentage}% ({err.count})</span>
                </div>
                <div className="w-full bg-sage-200 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: `${err.percentage}%` }} />
                </div>
                <p className="text-[11px] text-sage-600">{err.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Prescriptive Action Recommendations */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-white border border-emerald-200 text-emerald-700">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-emerald-950">
              Recommended Focus for Today
            </h3>
            <p className="text-xs text-emerald-800 mt-0.5">
              Review <strong>Electrostatics</strong> & <strong>Thermodynamics</strong> formulas in the Revision Center before launching another full mock.
            </p>
          </div>
        </div>
        <a
          href="/revision"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition"
        >
          <span>Open Revision Queue</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}