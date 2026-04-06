import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { getHabits } from "@/services/habits.service"
import { getHabitLogsForDate, getDailyEntryForDate, getMonthlySummary } from "@/services/calendar.service"

export const useCalendar = (selectedDate: Date | undefined, viewMonth: Date) => {
  const dateKey = selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""
  const monthKey = format(viewMonth, "yyyy-MM")

  const { data: habits = [] } = useQuery({
    queryKey: ["habits"],
    queryFn: getHabits,
  })

  const { data: selectedLogs = [] } = useQuery({
    queryKey: ["habit-logs", dateKey],
    queryFn: () => getHabitLogsForDate(dateKey),
    enabled: !!dateKey,
  })

  const { data: selectedEntry } = useQuery({
    queryKey: ["daily-entry", dateKey],
    queryFn: () => getDailyEntryForDate(dateKey),
    enabled: !!dateKey,
  })

  // Single API call for the whole month
  const { data: monthlySummary = {} } = useQuery({
    queryKey: ["monthly-summary", monthKey],
    queryFn: () => getMonthlySummary(monthKey),
  })

  const getDayStatus = (date: Date): "complete" | "partial" | "none" => {
    const key = format(date, "yyyy-MM-dd")
    const completed = monthlySummary[key] ?? 0
    const total = habits.length
    if (total === 0 || completed === 0) return "none"
    if (completed >= total) return "complete"
    return "partial"
  }

  return {
    habits,
    selectedLogs,
    selectedEntry,
    getDayStatus,
  }
}
