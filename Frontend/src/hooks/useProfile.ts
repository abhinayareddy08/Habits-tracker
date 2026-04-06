import { useQuery } from "@tanstack/react-query"
import { decodeToken } from "@/lib/token"
import { getUser, getUserStats } from "@/services/users.service"
import { getAchievements } from "@/services/achievements.service"

export const useProfile = () => {
  const decoded = decodeToken()

  const { data: user } = useQuery({
    queryKey: ["user", decoded?.id],
    queryFn: () => getUser(decoded!.id),
    enabled: !!decoded,
  })

  const { data: stats } = useQuery({
    queryKey: ["user-stats"],
    queryFn: getUserStats,
    enabled: !!decoded,
  })

  const { data: achievements = [] } = useQuery({
    queryKey: ["achievements"],
    queryFn: getAchievements,
    enabled: !!decoded,
  })

  const xpForNextLevel = user ? user.level * 1000 : 1000
  const xpPercent = user ? Math.min((user.xp / xpForNextLevel) * 100, 100) : 0

  return { user, stats, achievements, xpForNextLevel, xpPercent }
}
