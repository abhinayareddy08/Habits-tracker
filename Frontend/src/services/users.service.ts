import api from "./api"

export type User = {
  id: number
  name: string
  email: string
  xp: number
  level: number
  currentStreak: number
  longestStreak: number
  createdAt: string
}

export type UserStats = {
  totalHabitsCompleted: number
  totalJournalEntries: number
  currentStreak: number
  longestStreak: number
}

export const getUser = (id: number): Promise<User> => {
  return api.get(`/users/${id}`).then((res) => res.data)
}

export const getUserStats = (): Promise<UserStats> => {
  return api.get("/users/stats").then((res) => res.data)
}
