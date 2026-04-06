import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/ui/navbar"
import { styles } from "@/lib/styles"
import { useProfile } from "@/hooks/useProfile"
import { Trophy, Target, Flame, Star, Award, Crown, Zap, Shield, Lock, LogOut, type LucideIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { logout } from "@/lib/token"

const ALL_BADGES: { badgeType: string; name: string; icon: LucideIcon; color: string }[] = [
  { badgeType: "Habit_1",    name: "First Steps",    icon: Star,   color: "from-yellow-500 to-orange-500" },
  { badgeType: "STREAK_7",   name: "Week Warrior",   icon: Flame,  color: "from-orange-500 to-red-500" },
  { badgeType: "Habit_100",  name: "Habit Master",   icon: Target, color: "from-purple-500 to-pink-500" },
  { badgeType: "Habit_50",  name: "Centurion",      icon: Award,  color: "from-cyan-500 to-blue-500" },
  { badgeType: "LEVEL_5",   name: "Legend",         icon: Crown,  color: "from-yellow-500 to-amber-500" },
  { badgeType: "STREAK_30",  name: "Unstoppable",    icon: Zap,    color: "from-green-500 to-emerald-500" },
  { badgeType: "LEVEL_10",  name: "Guardian",       icon: Shield, color: "from-blue-500 to-indigo-500" },
  { badgeType: "STREAK_90", name: "Champion",       icon: Trophy, color: "from-purple-500 to-violet-500" },
]

export const ProfilePage = () => {
  const { user, stats, achievements, xpForNextLevel, xpPercent } = useProfile()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const unlockedTypes = new Set(achievements.map((a) => a.badgeType))

  const initials = user?.name
    .split(" ")
    .map((n) => n[0])
    .join("") ?? ""

  return (
    <div className={styles.pageBg}>
      <Navbar />

      <div className={`${styles.pagePadding} max-w-5xl mx-auto space-y-6`}>

        {/* Header */}
        <div className="space-y-2">
          <h1 className={styles.pageTitle}>Profile</h1>
          <p className={styles.pageSubtitle}>Your stats and achievements</p>
        </div>

        {/* Profile Card */}
        <Card className={styles.cardGradient}>
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="w-24 h-24 border-4 border-purple-500">
                <AvatarFallback className={`${styles.gradientBgBr} text-white text-3xl`}>
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center md:text-left">
                <h2 className={`text-3xl font-bold ${styles.cardTitleWhite}`}>{user?.name}</h2>
                <p className={styles.xpText}>{user?.email}</p>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Level {user?.level}</span>
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                      <Trophy className="w-4 h-4 mr-1" /> Adventurer
                    </Badge>
                  </div>
                  <Progress value={xpPercent} className="h-3 bg-slate-800" />
                  <p className={`text-sm ${styles.xpText}`}>
                    {user?.xp} / {xpForNextLevel} XP
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className={styles.cardDark}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${styles.cardTitleWhite}`}>
                <Target className="w-5 h-5 text-purple-500" /> Total Habits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                {stats?.totalHabitsCompleted ?? 0}
              </div>
              <p className={`text-sm ${styles.pageSubtitle} mt-1`}>habits completed</p>
            </CardContent>
          </Card>

          <Card className={styles.cardDark}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${styles.cardTitleWhite}`}>
                <Flame className="w-5 h-5 text-orange-500" /> Current Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-4xl font-bold ${styles.statStreakValue} bg-clip-text text-transparent`}>
                {stats?.currentStreak ?? 0}
              </div>
              <p className={`text-sm ${styles.pageSubtitle} mt-1`}>days in a row</p>
            </CardContent>
          </Card>

          <Card className={styles.cardDark}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${styles.cardTitleWhite}`}>
                <Trophy className="w-5 h-5 text-yellow-500" /> Longest Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
                {stats?.longestStreak ?? 0}
              </div>
              <p className={`text-sm ${styles.pageSubtitle} mt-1`}>days record</p>
            </CardContent>
          </Card>
        </div>

        {/* Badges */}
        <Card className={styles.cardDark}>
          <CardHeader>
            <CardTitle className={styles.cardTitleWhite}>Badges & Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {ALL_BADGES.map((badge) => {
                const Icon = badge.icon
                const unlocked = unlockedTypes.has(badge.badgeType)
                return (
                  <div
                    key={badge.badgeType}
                    className={`relative p-6 rounded-xl border-2 transition-all ${
                      unlocked
                        ? `border-transparent bg-gradient-to-br ${badge.color}`
                        : "border-slate-700 bg-slate-800/50"
                    }`}
                  >
                    {!unlocked && (
                      <div className="absolute inset-0 bg-slate-950/80 rounded-xl flex items-center justify-center">
                        <Lock className="w-8 h-8 text-slate-600" />
                      </div>
                    )}
                    <div className="flex flex-col items-center gap-2">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${unlocked ? "bg-white/20" : "bg-slate-700"}`}>
                        <Icon className={`w-8 h-8 ${unlocked ? "text-white" : "text-slate-600"}`} />
                      </div>
                      <span className={`text-sm font-semibold text-center ${unlocked ? "text-white" : "text-slate-500"}`}>
                        {badge.name}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full justify-center py-3 px-6 rounded-xl border border-red-500/40 text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>

      </div>
    </div>
  )
}
