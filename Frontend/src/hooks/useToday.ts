import { useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getHabits, getHabitLogs, logHabit, unlogHabit } from "@/services/habits.service"
import { getDailyEntry, createDailyEntry, updateDailyEntry } from "@/services/daily-entries.service"
import { toast } from "sonner"

export const useToday = (date: string) => {
  const queryClient = useQueryClient()

  const { data: habits = [] } = useQuery({
    queryKey: ["habits"],
    queryFn: getHabits,
  })

  const { data: logs = [] } = useQuery({
    queryKey: ["habit-logs", date],
    queryFn: () => getHabitLogs(date),
  })

  const { data: entry } = useQuery({
    queryKey: ["daily-entry", date],
    queryFn: () => getDailyEntry(date),
  })

  const completedIds = new Set(logs.map((log) => log.habitId))

  const [toggling, setToggling] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)

  const toggleHabit = async (habitId: number) => {
    if (toggling) return
    setToggling(habitId)
    try {
      if (completedIds.has(habitId)) {
        await unlogHabit(habitId, date)
      } else {
        await logHabit(habitId, date)
      }
      queryClient.invalidateQueries({ queryKey: ["habit-logs", date] })
    } finally {
      setToggling(null)
    }
  }

  const saveEntry = async (mood: string | null, journalText: string) => {
    setSaving(true)
    try {
      if (entry) {
        await updateDailyEntry(date, { mood: mood ?? undefined, journalText })
      } else {
        await createDailyEntry({ date, mood: mood ?? undefined, journalText })
      }
      queryClient.invalidateQueries({ queryKey: ["daily-entry", date] })
      toast.success("Entry saved!")
    } catch {
      toast.error("Failed to save entry")
    } finally {
      setSaving(false)
    }
  }

  return { habits, completedIds, toggling, toggleHabit, entry, saving, saveEntry }
}
