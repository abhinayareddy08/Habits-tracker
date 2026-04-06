import api from "./api"

export type Achievement = {
  id: number
  badgeType: string
  unlockedAt: string
}

export const getAchievements = (): Promise<Achievement[]> => {
  return api.get("/achievements").then((res) => res.data)
}
