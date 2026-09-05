"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Flame } from "lucide-react";

export default function FocusTimer() {
  const [mode, setMode] = useState<"FOCUS" | "BREAK">("FOCUS");
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25m Focus default
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (mode === "FOCUS") {
        setMode("BREAK");
        setTimeLeft(5 * 60);
      } else {
        setMode("FOCUS");
        setTimeLeft(25 * 60);
      }
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode]);

  const toggleRunning = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === "FOCUS" ? 25 * 60 : 5 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formatted = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-sage-200 bg-white shadow-xs">
      <span
        className={`w-2 h-2 rounded-full ${
          isRunning ? (mode === "FOCUS" ? "bg-emerald-500 animate-pulse" : "bg-amber-500 animate-pulse") : "bg-sage-300"
        }`}
      />
      <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-sage-900">
        <Flame className={`w-3.5 h-3.5 ${mode === "FOCUS" ? "text-rose-500" : "text-amber-500"}`} />
        <span>{formatted}</span>
      </div>
      <span className="text-[10px] font-semibold text-sage-500 uppercase tracking-wider hidden sm:inline">
        {mode}
      </span>
      <div className="flex items-center gap-0.5 border-l border-sage-100 pl-1.5">
        <button
          type="button"
          onClick={toggleRunning}
          className="p-1 rounded-md text-sage-600 hover:text-sage-900 hover:bg-sage-50 transition"
          title={isRunning ? "Pause" : "Start"}
        >
          {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
        <button
          type="button"
          onClick={resetTimer}
          className="p-1 rounded-md text-sage-400 hover:text-sage-700 hover:bg-sage-50 transition"
          title="Reset"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}