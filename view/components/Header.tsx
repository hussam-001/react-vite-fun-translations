export default function Header({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="h-[72px] flex items-center justify-between px-4 border-b">
      <div className="flex items-center">
        <h1 className="ms-4 text-xl font-bold text-white">{title}</h1>
      </div>
      {children}
    </div>
  );
}
