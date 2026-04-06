import api from "./api"
import type { HabitLog } from "./habits.service"
import type { DailyEntry } from "./daily-entries.service"

export const getHabitLogsForDate = (date: string): Promise<HabitLog[]> => {
  return api.get(`/habit-logs/${date}`).then((res) => res.data).catch(() => [])
}

export const getDailyEntryForDate = (date: string): Promise<DailyEntry | null> => {
  return api.get(`/daily-entries/${date}`).then((res) => res.data).catch(() => null)
}

export const getMonthlySummary = (month: string): Promise<Record<string, number>> => {
  return api.get(`/habit-logs/summary?month=${month}`).then((res) => res.data).catch(() => ({}))
}
