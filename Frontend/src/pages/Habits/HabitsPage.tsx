import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Navbar } from "@/components/ui/navbar"
import { styles } from "@/lib/styles"
import { useHabits } from "@/hooks/useHabits"
import { Plus, Trash2, Dumbbell, Book, Brain, Droplet, PenLine, Coffee, Heart, Moon, Sun, Target, type LucideIcon } from "lucide-react"

const iconOptions: { id: string; Icon: LucideIcon }[] = [
  { id: "dumbbell", Icon: Dumbbell },
  { id: "book", Icon: Book },
  { id: "brain", Icon: Brain },
  { id: "droplet", Icon: Droplet },
  { id: "pen", Icon: PenLine },
  { id: "coffee", Icon: Coffee },
  { id: "heart", Icon: Heart },
  { id: "moon", Icon: Moon },
  { id: "sun", Icon: Sun },
  { id: "target", Icon: Target },
]

const colorOptions = [
  { id: "#7c3aed", label: "Purple" },
  { id: "#0891b2", label: "Cyan" },
  { id: "#16a34a", label: "Green" },
  { id: "#ea580c", label: "Orange" },
  { id: "#db2777", label: "Pink" },
  { id: "#2563eb", label: "Blue" },
]

const getIcon = (iconId: string): LucideIcon => {
  return iconOptions.find((i) => i.id === iconId)?.Icon ?? Target
}

export const HabitsPage = () => {
  const { habits, addHabit, removeHabit } = useHabits()
  const [isOpen, setIsOpen] = useState(false)
  const [newHabitName, setNewHabitName] = useState("")
  const [selectedIcon, setSelectedIcon] = useState("dumbbell")
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].id)
  const [saving, setSaving] = useState(false)

  const handleAddHabit = async () => {
    if (!newHabitName.trim()) return
    setSaving(true)
    const success = await addHabit(newHabitName.trim(), selectedIcon, selectedColor)
    setSaving(false)
    if (success) {
      setNewHabitName("")
      setSelectedIcon("dumbbell")
      setSelectedColor(colorOptions[0].id)
      setIsOpen(false)
    }
  }

  return (
    <div className={styles.pageBg}>
      <Navbar />

      <div className={`${styles.pagePadding} max-w-4xl mx-auto space-y-6`}>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className={styles.pageTitle}>Habits</h1>
            <p className={styles.pageSubtitle}>Manage your daily habits</p>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className={styles.gradientBtn}>
                <Plus className="w-4 h-4 mr-2" /> Add Habit
              </Button>
            </DialogTrigger>
            <DialogContent className={styles.dialogContent}>
              <DialogHeader>
                <DialogTitle>Add New Habit</DialogTitle>
                <DialogDescription className={styles.dialogDescription}>
                  Create a new habit to track daily
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="habit-name" className={styles.label}>Habit Name</Label>
                  <Input
                    id="habit-name"
                    placeholder="e.g., Morning Jog"
                    value={newHabitName}
                    onChange={(e) => setNewHabitName(e.target.value)}
                    className={styles.input}
                  />
                </div>

                <div className="space-y-2">
                  <Label className={styles.label}>Icon</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {iconOptions.map(({ id, Icon }) => (
                      <button
                        key={id}
                        onClick={() => setSelectedIcon(id)}
                        className={selectedIcon === id ? styles.iconBtnActive : styles.iconBtn}
                      >
                        <Icon className="w-5 h-5 mx-auto text-slate-100" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className={styles.label}>Color</Label>
                  <div className="grid grid-cols-6 gap-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColor(color.id)}
                        className={`h-10 rounded-lg border-2 transition-all ${selectedColor === color.id ? "border-white scale-110" : "border-slate-700"}`}
                        style={{ backgroundColor: color.id }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button onClick={handleAddHabit} disabled={saving} className={styles.gradientBtn}>
                  {saving ? "Creating..." : "Create Habit"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Habits Grid */}
        {habits.length === 0 ? (
          <Card className={styles.cardDark}>
            <CardContent className="py-12 text-center">
              <Target className="w-12 h-12 mx-auto mb-4 text-slate-600" />
              <p className={styles.pageSubtitle}>No habits yet. Create your first habit to get started!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {habits.map((habit) => {
              const Icon = getIcon(habit.icon)
              return (
                <Card key={habit.id} className={`${styles.cardDark} hover:border-slate-700 transition-colors`}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: habit.color }}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-semibold ${styles.cardTitleWhite} truncate`}>{habit.name}</h3>
                        <p className={styles.pageSubtitle}>Daily habit</p>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-950">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className={styles.dialogContent}>
                          <AlertDialogHeader>
                            <AlertDialogTitle className={styles.cardTitleWhite}>Delete habit?</AlertDialogTitle>
                            <AlertDialogDescription className={styles.dialogDescription}>
                              This will permanently delete <span className="text-white font-medium">"{habit.name}"</span> and all its history. This cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className={styles.outlineBtn}>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-600 hover:bg-red-700 text-white"
                              onClick={() => removeHabit(habit.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

      </div>
    </div>
  )
}
