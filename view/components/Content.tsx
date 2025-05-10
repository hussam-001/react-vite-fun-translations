export default function Content({ children }) {
  return (
    <div className="p-6 w-full h-full flex-1 flex flex-col bg-background">
      {children}
    </div>
  );
}
