import { AppContext } from "contexts/app.context";
import { useContext } from "react";
import MenuIcon from "view/svg/MenuIcon";
import Button from "./Button";

export function SidepaneToggle() {
  const { toggleSidepane } = useContext(AppContext);
  return (
    <Button variant="icon" onClick={toggleSidepane}>
      <MenuIcon />
    </Button>
  );
}

export function Sidepane({ children }: { children: React.ReactNode }) {
  const { isSidepaneOpen, toggleSidepane } = useContext(AppContext);
  return (
    <>
      {isSidepaneOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidepane}
        />
      )}
      <div
        className={`fixed lg:relative inset-y-0 left-0 z-30 w-64 bg-sidebar-background text-white transition-all duration-200 ease-in-out ${
          isSidepaneOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0 lg:hidden"
        }`}
      >
        <div className="flex flex-col h-full">{children}</div>
      </div>
    </>
  );
}
