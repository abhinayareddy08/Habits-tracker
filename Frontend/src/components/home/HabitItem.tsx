import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { styles } from "@/lib/styles"
import type { Habit } from "@/services/habits.service"

interface Props {
  habit: Habit
  completed: boolean
  toggling: boolean
  onToggle: (id: number) => void
}

const HabitItem = ({ habit, completed, toggling, onToggle }: Props) => {
  return (
    <div
      className={styles.habitRow}
      onClick={() => !toggling && onToggle(habit.id)}
    >
      <Checkbox
        checked={completed}
        disabled={toggling}
        className="border-slate-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
      />
      <span className={`flex-1 text-sm ${completed ? "line-through text-slate-500" : "text-slate-200"}`}>
        {habit.name}
      </span>
      {completed && (
        <Badge variant="outline" className="border-green-600 text-green-400">
          +10 XP
        </Badge>
      )}
    </div>
  )
}

export default HabitItem
