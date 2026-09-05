"use client";

import React, { useState } from "react";
import { SEED_QUESTIONS } from "../../data/seedQuestions";
import { Question } from "../../types/question";
import { exportQuestionsToJson, exportQuestionsToCsv } from "../../utils/exporter";
import { Download, Upload, FileJson, FileSpreadsheet, CheckCircle2, AlertCircle } from "lucide-react";

export default function DataTransferPage() {
  const [questions, setQuestions] = useState<Question[]>(SEED_QUESTIONS);
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<"success" | "error" | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed: Question[] = JSON.parse(content);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].questionText) {
          setQuestions([...parsed, ...questions]);
          setStatusType("success");
          setImportStatus(`Successfully ingested ${parsed.length} questions into practice memory!`);
        } else {
          throw new Error("Invalid format");
        }
      } catch {
        setStatusType("error");
        setImportStatus("Failed to parse JSON file. Ensure it conforms to the Brahma question schema.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-sage-900">Data Import & Export Console</h1>
        <p className="text-xs text-sage-600">
          Backup your curated question archives or bulk-ingest standard NEET problem banks
        </p>
      </div>

      {/* Export Section */}
      <div className="bg-white border border-sage-200 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-sage-900 flex items-center gap-2">
          <Download className="w-4 h-4 text-sage-600" />
          Export Question Repository
        </h3>
        <p className="text-xs text-sage-600">
          Save all active problems ({questions.length} questions) locally in standard formats.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={() => exportQuestionsToJson(questions)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-sage-200 hover:bg-sage-50 text-sage-800 text-xs font-semibold transition"
          >
            <FileJson className="w-4 h-4 text-amber-600" />
            <span>Download JSON</span>
          </button>
          <button
            onClick={() => exportQuestionsToCsv(questions)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-sage-200 hover:bg-sage-50 text-sage-800 text-xs font-semibold transition"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Download CSV</span>
          </button>
        </div>
      </div>

      {/* Import Section */}
      <div className="bg-white border border-sage-200 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-sage-900 flex items-center gap-2">
          <Upload className="w-4 h-4 text-sage-600" />
          Bulk Ingest Questions
        </h3>
        <p className="text-xs text-sage-600">
          Upload a valid JSON array of questions to immediately populate your practice modules.
        </p>

        <label className="border-2 border-dashed border-sage-200 hover:border-sage-400 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-sage-50/50 transition">
          <Upload className="w-6 h-6 text-sage-500 mb-2" />
          <span className="text-xs font-semibold text-sage-800">Select JSON Question File</span>
          <span className="text-[11px] text-sage-500 mt-0.5">Click or drag file here</span>
          <input
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>

        {importStatus && (
          <div
            className={`p-3.5 rounded-xl border text-xs flex items-center gap-2 ${
              statusType === "success"
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-rose-50 text-rose-800 border-rose-200"
            }`}
          >
            {statusType === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            )}
            <span>{importStatus}</span>
          </div>
        )}
      </div>
    </div>
  );
}