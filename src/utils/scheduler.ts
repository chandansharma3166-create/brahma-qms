import { Question } from "../types/question";
import { ScheduledQuestion } from "../types/revision";

export function calculateNextReview(
  question: Question,
  isCorrect: boolean,
  currentLevel: number = 0,
  lapses: number = 0
): ScheduledQuestion {
  const now = new Date();
  let nextIntervalDays = 1;
  let newLevel = currentLevel;
  let newLapses = lapses;
  let reason = "";

  if (!isCorrect) {
    newLevel = 1;
    newLapses += 1;
    nextIntervalDays = 1;
    reason = "Missed on last attempt. Scheduled for priority consolidation.";
  } else {
    newLevel += 1;
    nextIntervalDays = newLevel === 1 ? 1 : newLevel === 2 ? 3 : 7;
    reason = `Answered correctly ${newLevel} time(s). Review in ${nextIntervalDays} day(s).`;
  }

  const dueDate = new Date(now.getTime() + nextIntervalDays * 24 * 60 * 60 * 1000);

  return {
    question,
    dueDate: dueDate.toISOString(),
    repetitionLevel: newLevel,
    lapseCount: newLapses,
    reason,
  };
}