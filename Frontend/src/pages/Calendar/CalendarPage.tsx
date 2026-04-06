import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/ui/navbar"
import { styles } from "@/lib/styles"
import { useCalendar } from "@/hooks/useCalendar"
import { CheckCircle2, Circle, BookOpen } from "lucide-react"

export const CalendarPage = () => {
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [viewMonth, setViewMonth] = useState<Date>(new Date())
  const { habits, selectedLogs, selectedEntry, getDayStatus } = useCalendar(selectedDate, viewMonth)

  const completedCount = selectedLogs.length
  const totalCount = habits.length

  const progressBadgeColor =
    completedCount === totalCount && totalCount > 0
      ? "bg-green-600"
      : completedCount > 0
      ? "bg-yellow-600"
      : "bg-slate-600"

  return (
    <div className={styles.pageBg}>
      <Navbar />

      <div className={`${styles.pagePadding} max-w-6xl mx-auto space-y-6`}>

        {/* Header */}
        <div className="space-y-2">
          <h1 className={styles.pageTitle}>Calendar</h1>
          <p className={styles.pageSubtitle}>Track your progress over time</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Calendar */}
          <Card className={`lg:col-span-2 ${styles.cardDark}`}>
            <CardHeader>
              <CardTitle className={styles.cardTitleWhite}>Monthly View</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                onMonthChange={setViewMonth}
                className="rounded-md border-slate-700"
                classNames={{
                  months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                  month: "space-y-4",
                  caption: "flex justify-center pt-1 relative items-center text-slate-100",
                  caption_label: "text-sm font-medium",
                  nav: "space-x-1 flex items-center",
                  nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-slate-100",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex",
                  head_cell: "text-slate-400 rounded-md w-9 font-normal text-[0.8rem]",
                  row: "flex w-full mt-2",
                  cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-slate-800 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                  day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 text-slate-100 hover:bg-slate-800 rounded-md",
                  day_selected: "bg-purple-600 text-white hover:bg-purple-700 focus:bg-purple-600 focus:text-white",
                  day_today: "bg-slate-700 text-slate-100",
                  day_outside: "text-slate-600 opacity-50",
                  day_disabled: "text-slate-600 opacity-50",
                  day_hidden: "invisible",
                }}
                modifiers={{
                  complete: (date) => getDayStatus(date) === "complete",
                  partial: (date) => getDayStatus(date) === "partial",
                }}
                modifiersClassNames={{
                  complete: "bg-green-600/30 border border-green-600 text-green-100",
                  partial: "bg-yellow-600/30 border border-yellow-600 text-yellow-100",
                }}
              />

              {/* Legend */}
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className={`${styles.legendDot} bg-green-600/30 border border-green-600`} />
                  <span className={styles.legendText}>All habits completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`${styles.legendDot} bg-yellow-600/30 border border-yellow-600`} />
                  <span className={styles.legendText}>Partially completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`${styles.legendDot} bg-slate-800`} />
                  <span className={styles.legendText}>No activity</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Selected Day Details */}
          <Card className={styles.cardDark}>
            <CardHeader>
              <CardTitle className={styles.cardTitleWhite}>
                {selectedDate ? format(selectedDate, "MMM d, yyyy") : "Select a date"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {completedCount > 0 || selectedEntry ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800">
                    <span className="text-slate-300">Progress</span>
                    <Badge className={progressBadgeColor}>
                      {completedCount}/{totalCount}
                    </Badge>
                  </div>

                  {completedCount > 0 && (
                    <div className="space-y-2">
                      <h4 className={`text-sm font-semibold ${styles.pageSubtitle}`}>Completed Habits:</h4>
                      <div className="space-y-2">
                        {selectedLogs.map((log) => {
                          const habit = habits.find((h) => h.id === log.habitId)
                          return (
                            <div key={log.id} className="flex items-center gap-2 text-slate-300">
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                              <span className="text-sm">{habit?.name ?? "Habit"}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  <Button
                    className={`w-full ${styles.navBtn}`}
                    onClick={() => selectedDate && navigate(`/today?date=${format(selectedDate, "yyyy-MM-dd")}`)}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    View Entry
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <Circle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No data for this date</p>
                </div>
              )}
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}
