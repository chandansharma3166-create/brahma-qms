"use client";

import React, { useState } from "react";
import { 
  Database, 
  RefreshCw, 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles,
  Sliders
} from "lucide-react";

export default function SettingsPage() {
  const [syncing, setSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [syncedCount, setSyncedCount] = useState<number | null>(null);

  const handleTriggerSync = async () => {
    setSyncing(true);
    setSyncStatus(null);

    try {
      const res = await fetch("/api/sync");
      const data = await res.json();
      setSyncedCount(data.count || 0);
      setSyncStatus(
        data.source === "GOOGLE_SHEETS"
          ? "Successfully synced latest rows from Google Sheets!"
          : "Connected via local memory seed. Set GOOGLE_SHEETS_CSV_URL in Vercel to sync a live spreadsheet."
      );
    } catch {
      setSyncStatus("Failed to contact sync service.");
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-sage-900">System & Integration Settings</h1>
        <p className="text-xs text-sage-600">
          Manage question banks, spreadsheet ingestion, and preparation preferences
        </p>
      </div>

      {/* Google Sheets Sync Card */}
      <div className="bg-white border border-sage-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sage-100 text-sage-600">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-sage-900">Google Sheets Content Sync</h3>
              <p className="text-xs text-sage-600">
                Mirror questions published on your Google Sheet directly to the platform
              </p>
            </div>
          </div>

          <button
            onClick={handleTriggerSync}
            disabled={syncing}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sage-500 hover:bg-sage-600 text-white text-xs font-semibold shadow-sm transition disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncing ? "animate-spin" : ""}`} />
            <span>{syncing ? "Syncing..." : "Sync Database Now"}</span>
          </button>
        </div>

        {syncStatus && (
          <div className="p-4 rounded-xl bg-sage-50 border border-sage-200 text-xs text-sage-800 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-sage-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Sync Status Report</span>
            </div>
            <p>{syncStatus}</p>
            {syncedCount !== null && (
              <p className="font-semibold text-sage-700">Total Available Questions: {syncedCount}</p>
            )}
          </div>
        )}

        <div className="border-t border-sage-100 pt-4 text-xs text-sage-600 space-y-2">
          <p className="font-bold text-sage-800">Spreadsheet Column Requirements:</p>
          <div className="bg-sage-50 p-3 rounded-lg font-mono text-[11px] text-sage-700 overflow-x-auto">
            id, subject, chapter, topic, questionText, optionA, optionB, optionC, optionD, correctOption, explanation, difficulty, source
          </div>
        </div>
      </div>

      {/* Target Aspirant Configuration */}
      <div className="bg-white border border-sage-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-sage-100 text-sage-600">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-sage-900">Preparation Configuration</h3>
            <p className="text-xs text-sage-600">Exam timeline and daily revision pace</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-3.5 rounded-xl border border-sage-200 bg-sage-50/50 space-y-1">
            <span className="text-[11px] font-bold text-sage-600 block uppercase tracking-wider">Exam Goal</span>
            <span className="text-sm font-bold text-sage-900 block">NEET Target</span>
            <span className="text-xs text-sage-600">NCERT-aligned syllabus coverage</span>
          </div>

          <div className="p-3.5 rounded-xl border border-sage-200 bg-sage-50/50 space-y-1">
            <span className="text-[11px] font-bold text-sage-600 block uppercase tracking-wider">Daily Goal</span>
            <span className="text-sm font-bold text-sage-900 block">60 Questions / Day</span>
            <span className="text-xs text-sage-600">30 Bio • 15 Phy • 15 Chem</span>
          </div>
        </div>
      </div>
    </div>
  );
}