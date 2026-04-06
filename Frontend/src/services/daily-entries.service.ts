import api from "./api"

export type DailyEntry = {
  id: number
  date: string
  mood: string | null
  journalText: string | null
}

export const getDailyEntry = (date: string): Promise<DailyEntry | null> => {
  return api.get(`/daily-entries/${date}`).then((res) => res.data).catch(() => null)
}

export const createDailyEntry = (data: { date: string; mood?: string; journalText?: string }): Promise<DailyEntry> => {
  return api.post("/daily-entries", data).then((res) => res.data)
}

export const updateDailyEntry = (date: string, data: { mood?: string; journalText?: string }): Promise<DailyEntry> => {
  return api.patch(`/daily-entries/${date}`, data).then((res) => res.data)
}
