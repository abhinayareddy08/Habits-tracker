import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getHabits, createHabit, deleteHabit } from "@/services/habits.service"
import { toast } from "sonner"

export const useHabits = () => {
  const queryClient = useQueryClient()

  const { data: habits = [] } = useQuery({
    queryKey: ["habits"],
    queryFn: getHabits,
  })

  const addHabit = async (name: string, icon: string, color: string) => {
    try {
      await createHabit({ name, icon, color })
      queryClient.invalidateQueries({ queryKey: ["habits"] })
      toast.success("Habit created!")
      return true
    } catch {
      toast.error("Failed to create habit")
      return false
    }
  }

  const removeHabit = async (id: number) => {
    try {
      await deleteHabit(id)
      queryClient.invalidateQueries({ queryKey: ["habits"] })
      toast.success("Habit deleted")
    } catch {
      toast.error("Failed to delete habit")
    }
  }

  return { habits, addHabit, removeHabit }
}
