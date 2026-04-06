import { useState, useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { format, addDays, subDays, parseISO } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/ui/navbar"
import { styles } from "@/lib/styles"
import { useToday } from "@/hooks/useToday"
import { Save, Smile, Meh, Frown, Angry, Brain, Zap, HeartCrack, Heart, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react"

const moods = [
  { id: "happy", icon: Smile, label: "Happy", gradient: "from-green-500 to-emerald-500" },
  { id: "neutral", icon: Meh, label: "Neutral", gradient: "from-blue-500 to-cyan-500" },
  { id: "sad", icon: Frown, label: "Sad", gradient: "from-purple-500 to-indigo-500" },
  { id: "angry", icon: Angry, label: "Angry", gradient: "from-red-500 to-orange-500" },
  { id: "anxious", icon: Brain, label: "Anxious", gradient: "from-yellow-500 to-amber-500" },
  { id: "stressed", icon: Zap, label: "Stressed", gradient: "from-orange-500 to-rose-500" },
  { id: "guilty", icon: HeartCrack, label: "Guilty", gradient: "from-pink-500 to-fuchsia-500" },
  { id: "inlove", icon: Heart, label: "In Love", gradient: "from-rose-400 to-pink-500" },
]

export const TodayPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const dateParam = searchParams.get("date")
  const currentDate = dateParam ? parseISO(dateParam) : new Date()
  const dateKey = format(currentDate, "yyyy-MM-dd")

  const { habits, completedIds, toggling, toggleHabit, entry, saving, saveEntry } = useToday(dateKey)

  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [journalText, setJournalText] = useState("")

  // Sync form state when entry loads or date changes
  useEffect(() => {
    setSelectedMood(entry?.mood ?? null)
    setJournalText(entry?.journalText ?? "")
  }, [entry, dateKey])

  const isToday = dateKey === format(new Date(), "yyyy-MM-dd")
  const isFutureDate = currentDate > new Date()

  const navigateToDate = (date: Date) => navigate(`/today?date=${format(date, "yyyy-MM-dd")}`)

  return (
    <div className={styles.pageBg}>
      <Navbar />

      <div className={`${styles.pagePadding} max-w-4xl mx-auto space-y-6`}>

        {/* Header */}
        <div className="space-y-2">
          <h1 className={styles.pageTitle}>Today's Entry</h1>
          <p className={styles.pageSubtitle}>{format(currentDate, "EEEE, MMMM d, yyyy")}</p>
        </div>

        {/* Date Navigation */}
        <div className="flex justify-between">
          <Button onClick={() => navigateToDate(subDays(currentDate, 1))} className={styles.navBtn}>
            <ChevronLeft className="w-5 h-5" /> Previous Day
          </Button>
          <Button onClick={() => navigate("/today")} className={styles.navBtn} disabled={isToday}>
            <CalendarIcon className="w-5 h-5" /> Today
          </Button>
          <Button onClick={() => navigateToDate(addDays(currentDate, 1))} className={styles.navBtn} disabled={isFutureDate}>
            Next Day <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Mood Selector */}
        <Card className={styles.cardDark}>
          <CardHeader>
            <CardTitle className={styles.cardTitleWhite}>How are you feeling today?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {moods.map(({ id, icon: Icon, label, gradient }) => {
                const isSelected = selectedMood === id
                return (
                  <button
                    key={id}
                    onClick={() => setSelectedMood(id)}
                    className={isSelected ? `${styles.moodBtnActive} bg-gradient-to-br ${gradient}` : styles.moodBtn}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Icon className={`w-10 h-10 ${isSelected ? "text-white" : "text-slate-400"}`} />
                      <span className={`text-sm ${isSelected ? "text-white font-semibold" : "text-slate-400"}`}>
                        {label}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Journal */}
        <Card className={styles.cardDark}>
          <CardHeader>
            <CardTitle className={styles.cardTitleWhite}>What did you do today?</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Write about your day, achievements, challenges, thoughts..."
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              className={styles.textarea}
            />
          </CardContent>
        </Card>

        {/* Habits */}
        <Card className={styles.cardDark}>
          <CardHeader>
            <CardTitle className={styles.cardTitleWhite}>Today's Habits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {habits.map((habit) => {
              const completed = completedIds.has(habit.id)
              return (
                <div
                  key={habit.id}
                  className={styles.habitRowLg}
                  onClick={() => !toggling && toggleHabit(habit.id)}
                >
                  <Checkbox
                    checked={completed}
                    disabled={toggling === habit.id}
                    className="border-slate-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                  />
                  <span className={`flex-1 ${completed ? "line-through text-slate-500" : "text-slate-200"}`}>
                    {habit.name}
                  </span>
                  {completed && (
                    <Badge variant="outline" className="border-green-600 text-green-400">+10 XP</Badge>
                  )}
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button
          onClick={() => saveEntry(selectedMood, journalText)}
          disabled={saving}
          className={`w-full ${styles.gradientBtn} text-lg py-6`}
        >
          <Save className="w-5 h-5 mr-2" />
          {saving ? "Saving..." : "Save Entry"}
        </Button>

      </div>
    </div>
  )
}
