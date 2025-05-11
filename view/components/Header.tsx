export default function Header({ children }: { children?: React.ReactNode }) {
  return (
    <div className="h-[72px] flex items-center justify-between px-4 border-b">
      {children}
    </div>
  );
}
