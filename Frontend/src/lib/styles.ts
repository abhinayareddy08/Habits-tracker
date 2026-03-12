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

  // Button
  gradientBtn:
    "bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity cursor-pointer",
  outlineBtn:
    "border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer",

  // Links
  link: "text-purple-400 hover:text-purple-300 cursor-pointer",

  // Input
  input: "bg-[#0D1117] border-slate-700 text-white placeholder:text-slate-500",

  // Navbar
  navbar:
    "w-full bg-[#0A0F1E] border-b border-slate-800 px-4 md:px-8 py-3 flex items-center justify-between",
  navLink:
    "text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-1.5",
  navLinkActive:
    "text-white bg-purple-600 px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5",
};
