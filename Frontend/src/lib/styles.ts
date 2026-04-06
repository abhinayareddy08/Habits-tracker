export const styles = {
  // Backgrounds
  pageBg: "min-h-screen w-full bg-[#0A0F1E]",
  card: "bg-[#1A1F2E] rounded-2xl",
  cardDarker: "bg-[#0D1117] rounded-2xl",

  // Gradients
  gradientBg: "bg-gradient-to-r from-purple-600 to-cyan-500",
  gradientBgBr: "bg-gradient-to-br from-purple-600 to-cyan-500",
  gradientText:
    "bg-gradient-to-br from-purple-400 to-cyan-400 bg-clip-text text-transparent",

  // Typography
  pageTitle: "text-2xl md:text-4xl font-bold text-white",
  pageSubtitle: "text-sm md:text-base text-slate-400",
  cardTitle: "text-sm md:text-base font-semibold text-slate-300",
  label: "text-xs md:text-sm font-medium text-slate-300",

  // Spacing
  pagePadding: "p-4 md:p-8",
  cardPadding: "p-4 md:p-6",
  gap: "gap-3 md:gap-5",
  sectionGap: "gap-4 md:gap-6",
  logoDiv:
    "h-8 w-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center",
  logo: "w-4 h-4 md:w-5 md:h-5 text-white",

  // Button
  gradientBtn:
    "bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity cursor-pointer",
  outlineBtn:
    "border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer",

  // Links
  link: "text-purple-400 hover:text-purple-300 cursor-pointer",

  // Input
  input: "bg-[#0D1117] border-slate-700 text-white placeholder:text-slate-500",

  // Cards (shadcn overrides)
  cardDark: "bg-slate-900 border-slate-800",
  cardGradient: "bg-gradient-to-br from-purple-900/50 to-cyan-900/50 border-purple-700/50",
  cardTitleWhite: "text-slate-100",
  statValue: "text-6xl font-bold bg-clip-text text-transparent",
  statStreakValue: "bg-gradient-to-r from-orange-500 to-red-500",
  statProgressValue: "bg-gradient-to-r from-cyan-500 to-blue-500",
  xpText: "text-sm text-purple-300",
  habitRow: "flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer",
  habitRowLg: "flex items-center gap-3 p-4 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer",
  moodBtn: "p-6 rounded-xl border-2 border-slate-700 bg-slate-800 hover:border-slate-600 transition-all",
  moodBtnActive: "p-6 rounded-xl border-2 border-purple-500 transition-all",
  textarea: "min-h-[200px] bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 resize-none",
  navBtn: "bg-slate-800 hover:bg-slate-700 text-slate-100",
  dialogContent: "bg-slate-900 border-slate-800 text-slate-100",
  dialogDescription: "text-slate-400",
  iconBtn: "p-3 rounded-lg border-2 border-slate-700 bg-slate-800 hover:border-slate-600 transition-all",
  iconBtnActive: "p-3 rounded-lg border-2 border-purple-500 bg-purple-500/20 transition-all",
  legendDot: "w-6 h-6 rounded-md",
  legendText: "text-slate-400 text-sm",

  // Navbar
  navbar:
    "w-full bg-[#0A0F1E] border-b border-slate-800 px-4 md:px-8 py-3 flex items-center justify-between",
  navLink:
    "text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2",
  navLinkActive:
    "text-white bg-purple-600 px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5",
};
