import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Zap } from "lucide-react"
import { styles } from "@/lib/styles"
import type { User } from "@/services/users.service"

interface Props {
  user: User
  xpForNextLevel: number
}

const XpCard = ({ user, xpForNextLevel }: Props) => {
  const xpPercent = Math.min((user.xp / xpForNextLevel) * 100, 100)

  return (
    <Card className={styles.cardGradient}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className={`text-2xl ${styles.cardTitleWhite}`}>Level {user.level}</CardTitle>
            <CardDescription className={styles.xpText}>
              {user.xp} / {xpForNextLevel} XP
            </CardDescription>
          </div>
          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-lg px-4 py-2">
            <Trophy className="w-5 h-5 mr-2" />
            Adventurer
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Progress value={xpPercent} className="h-4 bg-slate-800" />
          <div className={`flex items-center gap-2 text-sm ${styles.xpText}`}>
            <Zap className="w-4 h-4" />
            <span>{xpForNextLevel - user.xp} XP until next level</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default XpCard
