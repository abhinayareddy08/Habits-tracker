import api from "./api"

export type Habit = {
  id: number
  name: string
  icon: string
  color: string
}

export type HabitLog = {
  id: number
  habitId: number
  date: string
}

export const getHabits = (): Promise<Habit[]> => {
  return api.get("/habits").then((res) => res.data)
}

export const createHabit = (data: { name: string; icon: string; color: string }): Promise<Habit> => {
  return api.post("/habits", data).then((res) => res.data)
}

export const deleteHabit = (id: number): Promise<void> => {
  return api.delete(`/habits/${id}`).then((res) => res.data)
}

export const getHabitLogs = (date: string): Promise<HabitLog[]> => {
  return api.get(`/habit-logs/${date}`).then((res) => res.data)
}

export const logHabit = (habitId: number, date: string): Promise<HabitLog> => {
  return api.post("/habit-logs", { habitId, date }).then((res) => res.data)
}

export const unlogHabit = (habitId: number, date: string): Promise<void> => {
  return api.delete("/habit-logs", { data: { habitId, date } }).then((res) => res.data)
}
