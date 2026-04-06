import { useHome } from "@/hooks/useHome";
import { Navbar } from "@/components/ui/navbar";
import XpCard from "@/components/home/XpCard";
import StatCard from "@/components/home/StatCard";
import HabitItem from "@/components/home/HabitItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { BookOpen, Flame, Trophy } from "lucide-react";
import { styles } from "@/lib/styles";

export const HomePage = () => {
  const { user, habits, completedIds, toggling, toggleHabit, xpForNextLevel } = useHome();
  const currentStreak = (user as any)?.currentStreak ?? 0;

  return (
    <div className={styles.pageBg}>
      <Navbar />

      <div className={`${styles.pagePadding} max-w-5xl mx-auto space-y-6`}>

        {/* Welcome Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-slate-100">
            Welcome back, {user?.name ?? ""}! 👋
          </h1>
          <p className="text-slate-400">Ready to conquer today's quests?</p>
        </div>

        {/* Level & XP Card */}
        {user && <XpCard user={user} xpForNextLevel={xpForNextLevel} />}

        {/* Streak + Progress */}
        <div className="grid md:grid-cols-2 gap-6">
          <StatCard
            label="Current Streak"
            value={currentStreak}
            sub="days in a row!"
            icon={Flame}
            iconColor="text-orange-500"
            valueGradient={styles.statStreakValue}
          />
          <StatCard
            label="Today's Progress"
            value={`${completedIds.size}/${habits.length}`}
            sub="habits completed"
            icon={Trophy}
            iconColor="text-yellow-500"
            valueGradient={styles.statProgressValue}
          />
        </div>

        {/* Today's Habits */}
        <Card className={styles.cardDark}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-slate-100">Today's Habits</CardTitle>
              <Link to="/today">
                <Button variant="outline" size="sm" className="border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Open Journal
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {habits.length === 0 ? (
              <p className="text-slate-400 text-sm">
                No habits yet.{" "}
                <Link to="/habits" className={styles.link}>Add one!</Link>
              </p>
            ) : (
              habits.map((habit) => (
                <HabitItem
                  key={habit.id}
                  habit={habit}
                  completed={completedIds.has(habit.id)}
                  toggling={toggling === habit.id}
                  onToggle={toggleHabit}
                />
              ))
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
};
