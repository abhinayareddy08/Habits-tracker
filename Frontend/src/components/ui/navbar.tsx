import { styles } from "@/lib/styles";
import { Home, BookOpen, Calendar, Target, User } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  return (
    <div>
      <nav className={styles.navbar}>
        <div className="flex items-center gap-2">
          <div className={`${styles.logoDiv} ${styles.gradientBgBr}`}>
            <Target className={styles.logo} />
          </div>
          <span className={`${styles.gradientText} font-semibold text-lg`}>DayQuest</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/home"
            className={
              isActive("/home") ? styles.navLinkActive : styles.navLink
            }
          >
            <Home size={16} />
            Home
          </Link>
          <Link
            to="/today"
            className={
              isActive("/today") ? styles.navLinkActive : styles.navLink
            }
          >
            <BookOpen size={16} />
            Today
          </Link>
          <Link
            to="/calendar"
            className={
              isActive("/calendar") ? styles.navLinkActive : styles.navLink
            }
          >
            <Calendar size={16} />
            Calender
          </Link>
          <Link
            to="/habits"
            className={
              isActive("/habits") ? styles.navLinkActive : styles.navLink
            }
          >
            <Target size={16} />
            Habits
          </Link>
          <Link
            to="/profile"
            className={
              isActive("/profile") ? styles.navLinkActive : styles.navLink
            }
          >
            <User size={16} />
            Profile
          </Link>
        </div>
      </nav>
      {/* Mobile bottom navbar */}
      <nav className="flex md:hidden fixed bottom-0 w-full bg-[#1A1F2E] border-t border-slate-800 px-4 py-3 justify-around items-center z-50">
        <Link
          to="/home"
          className={isActive("/home") ? styles.navLinkActive : styles.navLink}
        >
          <Home size={20} />
        </Link>
        <Link
          to="/today"
          className={isActive("/today") ? styles.navLinkActive : styles.navLink}
        >
          <BookOpen size={20} />
        </Link>
        <Link
          to="/calendar"
          className={
            isActive("/calendar") ? styles.navLinkActive : styles.navLink
          }
        >
          <Calendar size={20} />
        </Link>
        <Link
          to="/habits"
          className={
            isActive("/habits") ? styles.navLinkActive : styles.navLink
          }
        >
          <Target size={20} />
        </Link>
        <Link
          to="/profile"
          className={
            isActive("/profile") ? styles.navLinkActive : styles.navLink
          }
        >
          <User size={20} />
        </Link>
      </nav>
    </div>
  );
};
