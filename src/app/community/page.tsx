"use client";

import React, { useState } from "react";
import { SharedQuestionSet, Comment } from "../../types/community";
import { 
  Users, 
  MessageSquare, 
  ThumbsUp, 
  Share2, 
  Sparkles, 
  Send, 
  BookmarkCheck, 
  GraduationCap 
} from "lucide-react";

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<"SETS" | "DOUBTS">("SETS");

  const [questionSets] = useState<SharedQuestionSet[]>([
    {
      id: "SET-101",
      title: "High-Yield Genetics Assertion-Reason Sprint",
      creator: "Dr. Sharma (Faculty)",
      subject: "BIOLOGY",
      questionCount: 35,
      likes: 142,
      description: "Carefully curated NCERT lines on Mendelian disorders and linkage.",
      isCuratedByFaculty: true,
    },
    {
      id: "SET-102",
      title: "Electrostatics & Magnetism Trap Questions",
      creator: "Aarav K. (Top Aspirant)",
      subject: "PHYSICS",
      questionCount: 25,
      likes: 88,
      description: "Collection of edge-case dipole questions and tricky vector math.",
    },
    {
      id: "SET-103",
      title: "VSEPR & Coordination Isomerism Drill",
      creator: "Ananya P.",
      subject: "CHEMISTRY",
      questionCount: 30,
      likes: 64,
      description: "Frequent PYQ concepts testing lone pairs and geometry.",
    },
  ]);

  const [comments, setComments] = useState<Comment[]>([
    {
      id: "c-1",
      author: "Priya S.",
      avatarText: "PS",
      content: "Why is peroxisome excluded from the endomembrane system? Its enzymes also process cellular waste.",
      timestamp: "2 hours ago",
      upvotes: 8,
    },
    {
      id: "c-2",
      author: "Rahul Verma (Faculty)",
      avatarText: "RV",
      content: "The endomembrane system relies on vesicle traffic coordination (ER -> Golgi -> Lysosome). Peroxisomes originate independently, hence excluded as per NCERT.",
      timestamp: "1 hour ago",
      upvotes: 19,
    },
  ]);

  const [newComment, setNewComment] = useState("");

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const entry: Comment = {
      id: `c-${Date.now()}`,
      author: "You (Aspirant)",
      avatarText: "ME",
      content: newComment,
      timestamp: "Just now",
      upvotes: 0,
    };

    setComments([...comments, entry]);
    setNewComment("");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-sage-900">Community & Doubt Hub</h1>
        <p className="text-xs text-sage-600">
          Faculty-curated question sets, peer sharing, and conceptual doubt resolutions
        </p>
      </div>

      {/* Mode Switches */}
      <div className="flex gap-3">
        <button
          onClick={() => setActiveTab("SETS")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
            activeTab === "SETS"
              ? "bg-sage-500 text-white shadow-sm"
              : "bg-white border border-sage-200 text-sage-700 hover:bg-sage-50"
          }`}
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Curated Question Sets</span>
        </button>

        <button
          onClick={() => setActiveTab("DOUBTS")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
            activeTab === "DOUBTS"
              ? "bg-sage-500 text-white shadow-sm"
              : "bg-white border border-sage-200 text-sage-700 hover:bg-sage-50"
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Doubt Discussions</span>
        </button>
      </div>

      {/* Tab 1: Shared Question Sets */}
      {activeTab === "SETS" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {questionSets.map((set) => (
            <div
              key={set.id}
              className="bg-white border border-sage-200 rounded-2xl p-5 shadow-sm space-y-4 hover:border-sage-300 transition flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sage-100 text-sage-800">
                    {set.subject}
                  </span>
                  {set.isCuratedByFaculty && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <GraduationCap className="w-3 h-3" />
                      Faculty Verified
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-sage-900 leading-snug">
                  {set.title}
                </h3>
                <p className="text-xs text-sage-600 leading-relaxed">
                  {set.description}
                </p>
              </div>

              <div className="pt-3 border-t border-sage-100 flex items-center justify-between text-xs text-sage-600">
                <span>{set.questionCount} Questions</span>
                <div className="flex items-center gap-1 text-sage-700 font-semibold">
                  <ThumbsUp className="w-3.5 h-3.5 text-sage-500" />
                  <span>{set.likes}</span>
                </div>
              </div>

              <button className="w-full py-2 rounded-xl bg-sage-50 hover:bg-sage-100 text-sage-800 text-xs font-semibold transition">
                Import to Practice
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Doubt Discussion Stream */}
      {activeTab === "DOUBTS" && (
        <div className="bg-white border border-sage-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="border-b border-sage-100 pb-4">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
              Active Question Discussion: BIO-001 (Endomembrane System)
            </span>
          </div>

          {/* Comment Thread */}
          <div className="space-y-4">
            {comments.map((c) => (
              <div key={c.id} className="p-4 rounded-xl bg-sage-50/70 border border-sage-100 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-sage-200 text-sage-800 text-[10px] font-bold flex items-center justify-center">
                      {c.avatarText}
                    </span>
                    <span className="text-xs font-bold text-sage-900">{c.author}</span>
                  </div>
                  <span className="text-[10px] text-sage-500">{c.timestamp}</span>
                </div>
                <p className="text-xs text-sage-800 leading-relaxed pl-8">
                  {c.content}
                </p>
                <div className="pl-8 flex items-center gap-1 text-[11px] text-sage-600 font-semibold">
                  <ThumbsUp className="w-3 h-3 text-sage-500" />
                  <span>{c.upvotes} Helpful</span>
                </div>
              </div>
            ))}
          </div>

          {/* Comment Input */}
          <form onSubmit={handlePostComment} className="flex gap-2 pt-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ask a clarification or post your explanation..."
              className="flex-1 text-xs p-3 bg-sage-50 border border-sage-200 rounded-xl text-sage-900 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-sage-500 hover:bg-sage-600 text-white rounded-xl text-xs font-semibold transition flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}