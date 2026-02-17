export const DisabledContactButton = ({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) => (
  <span
    className="w-full flex items-center justify-center gap-2 bg-slate-300
      dark:bg-slate-700 text-slate-500 dark:text-slate-400 py-2 px-4
      rounded-lg font-medium cursor-not-allowed opacity-50"
  >
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </span>
);
