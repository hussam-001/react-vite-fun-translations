import { createContext, useCallback, useEffect, useState } from "react";
import useIsMobile from "view/hooks/useIsMobile";

export const AppContext = createContext({
  isSidepaneOpen: false,
  toggleSidepane: () => {},
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const [isSidepaneOpen, setIsSidepaneOpen] = useState(!isMobile);

  useEffect(() => setIsSidepaneOpen(!isMobile), [isMobile]);

  const toggleSidepane = useCallback(
    () => setIsSidepaneOpen((isOpen) => !isOpen),
    []
  );

  return (
    <AppContext.Provider value={{ isSidepaneOpen, toggleSidepane }}>
      {children}
    </AppContext.Provider>
  );
}
