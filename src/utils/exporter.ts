import { Question } from "../types/question";

export function exportQuestionsToJson(questions: Question[]) {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(questions, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `brahma-qms-export-${new Date().toISOString().split("T")[0]}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function exportQuestionsToCsv(questions: Question[]) {
  const headers = ["id", "subject", "chapter", "topic", "difficulty", "questionText", "explanation"];
  const rows = questions.map((q) => [
    `"${q.id}"`,
    `"${q.subject}"`,
    `"${q.chapter.replace(/"/g, '""')}"`,
    `"${q.topic.replace(/"/g, '""')}"`,
    `"${q.difficulty}"`,
    `"${q.questionText.replace(/"/g, '""')}"`,
    `"${q.explanation.replace(/"/g, '""')}"`,
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", encodedUri);
  downloadAnchor.setAttribute("download", `brahma-qms-export-${new Date().toISOString().split("T")[0]}.csv`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}