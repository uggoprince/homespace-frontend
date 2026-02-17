interface GroupProps {
  children: React.ReactNode;
}

export const Group = ({ children }: GroupProps) => (
  <div className="w-full flex flex-col md:flex-row gap-2 md:gap-4 items-start">
    {children}
  </div>
);