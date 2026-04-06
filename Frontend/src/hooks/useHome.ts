import { useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { decodeToken } from "@/lib/token"
import { getUser } from "@/services/users.service"
import type { User } from "@/services/users.service"
import { getHabits, getHabitLogs, logHabit, unlogHabit } from "@/services/habits.service"

const today = () => new Date().toISOString().split("T")[0]

export const useHome = () => {
  const queryClient = useQueryClient()
  const decoded = decodeToken()
  const todayDate = today()

  // Fetch user profile
  const { data: user } = useQuery<User>({
    queryKey: ["user", decoded?.id],
    queryFn: () => getUser(decoded!.id),
    enabled: !!decoded,
  })

  // Fetch all habits
  const { data: habits = [] } = useQuery({
    queryKey: ["habits"],
    queryFn: getHabits,
    enabled: !!decoded,
  })

  // Fetch today's completed habit logs
  const { data: logs = [] } = useQuery({
    queryKey: ["habit-logs", todayDate],
    queryFn: () => getHabitLogs(todayDate),
    enabled: !!decoded,
  })

  const completedIds = new Set(logs.map((log) => log.habitId))

  // Toggle a habit on/off
  const [toggling, setToggling] = useState<number | null>(null)

  const toggleHabit = async (habitId: number) => {
    if (toggling) return
    setToggling(habitId)

    try {
      if (completedIds.has(habitId)) {
        await unlogHabit(habitId, todayDate)
      } else {
        await logHabit(habitId, todayDate)
      }
          // Tell TanStack Query to refetch the logs and user (streak updates)
      queryClient.invalidateQueries({ queryKey: ["habit-logs", todayDate] })
      queryClient.invalidateQueries({ queryKey: ["user", decoded?.id] })
    } finally {
      setToggling(null)
    }
  }

  const xpForNextLevel = user ? user.level * 1000 : 1000

  return {
    user: user as User | undefined,
    habits,
    completedIds,
    toggling,
    toggleHabit,
    xpForNextLevel,
    todayDate,
  }
}
