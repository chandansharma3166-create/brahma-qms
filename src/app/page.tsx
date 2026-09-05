import React from "react";
import { 
  Sparkles, 
  Flame, 
  Target, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  BookOpen,
  FlaskConical,
  Atom,
  RotateCcw
} from "lucide-react";

export default function DashboardPage() {
  const subjects = [
    {
      name: "Biology",
      icon: <BookOpen className="w-5 h-5 text-emerald-600" />,
      tag: "Botany & Zoology",
      accuracy: "84%",
      mastery: "72%",
      totalQuestions: 1420,
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
    },
    {
      name: "Physics",
      icon: <Atom className="w-5 h-5 text-teal-600" />,
      tag: "Mechanics & Modern",
      accuracy: "68%",
      mastery: "54%",
      totalQuestions: 980,
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200",
    },
    {
      name: "Chemistry",
      icon: <FlaskConical className="w-5 h-5 text-sage-600" />,
      tag: "Organic & Physical",
      accuracy: "76%",
      mastery: "65%",
      totalQuestions: 1140,
      bgColor: "bg-sage-100",
      borderColor: "border-sage-300",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Top Banner: Daily Goal & Motivation */}
      <div className="bg-white border border-sage-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sage-100 text-sage-800">
              <Sparkles className="w-3.5 h-3.5 text-sage-600" />
              NEET 2027 Mission
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              12 Day Streak
            </span>
          </div>
          <h1 className="text-2xl font-bold text-sage-900 tracking-tight">
            Welcome back, Aspirant
          </h1>
          <p className="text-sm text-sage-600">
            You have <strong className="text-sage-800">18 questions</strong> due for spaced revision today. Keep the memory retention high.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sage-500 text-white text-sm font-medium hover:bg-sage-600 shadow-sm transition">
            <RotateCcw className="w-4 h-4" />
            Start Revision
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-sage-300 text-sage-800 text-sm font-medium bg-white hover:bg-sage-50 transition">
            Test Builder
          </button>
        </div>
      </div>

      {/* Snapshot Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-sage-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-sage-600 text-xs font-medium mb-2">
            <span>Overall Accuracy</span>
            <Target className="w-4 h-4 text-sage-500" />
          </div>
          <div className="text-2xl font-bold text-sage-900">76.4%</div>
          <p className="text-[11px] text-sage-600 mt-1">+2.1% from last week</p>
        </div>

        <div className="bg-white border border-sage-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-sage-600 text-xs font-medium mb-2">
            <span>Questions Solved</span>
            <CheckCircle2 className="w-4 h-4 text-sage-500" />
          </div>
          <div className="text-2xl font-bold text-sage-900">3,540</div>
          <p className="text-[11px] text-sage-600 mt-1">Goal: 5,000 before test series</p>
        </div>

        <div className="bg-white border border-sage-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-sage-600 text-xs font-medium mb-2">
            <span>Avg Speed / Question</span>
            <Clock className="w-4 h-4 text-sage-500" />
          </div>
          <div className="text-2xl font-bold text-sage-900">54s</div>
          <p className="text-[11px] text-sage-600 mt-1">Target: &lt; 50s for Biology</p>
        </div>

        <div className="bg-white border border-sage-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-sage-600 text-xs font-medium mb-2">
            <span>Revision Queue</span>
            <RotateCcw className="w-4 h-4 text-sage-500" />
          </div>
          <div className="text-2xl font-bold text-amber-600">18 Due</div>
          <p className="text-[11px] text-sage-600 mt-1">4 High-yield mistakes</p>
        </div>
      </div>

      {/* Subject Focus Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-sage-900">NEET Subjects</h2>
            <p className="text-xs text-sage-600">Track mastery by subject domain</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {subjects.map((sub) => (
            <div
              key={sub.name}
              className={`rounded-2xl border p-5 bg-white transition hover:shadow-md ${sub.borderColor}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${sub.bgColor}`}>
                  {sub.icon}
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-sage-50 text-sage-700 border border-sage-200">
                  {sub.accuracy} Acc.
                </span>
              </div>

              <h3 className="text-base font-bold text-sage-900">{sub.name}</h3>
              <p className="text-xs text-sage-600 mb-4">{sub.tag}</p>

              <div className="space-y-1.5 border-t border-sage-100 pt-3">
                <div className="flex justify-between text-xs text-sage-700 font-medium">
                  <span>Topic Mastery</span>
                  <span>{sub.mastery}</span>
                </div>
                <div className="h-1.5 w-full bg-sage-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-sage-500 rounded-full" 
                    style={{ width: sub.mastery }}
                  />
                </div>
              </div>

              <button className="mt-4 w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium text-sage-800 bg-sage-50 hover:bg-sage-100 transition">
                <span>Enter Practice</span>
                <ArrowRight className="w-3.5 h-3.5 text-sage-600" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}