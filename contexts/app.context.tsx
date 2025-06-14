import type { Engine } from "domain/types/Engine";
import type { Translation } from "domain/types/Translation";
import useIsMobile from "hooks/useIsMobile";
import { useLocalStorage } from "hooks/useLocalStorage";
import { createContext, useCallback, useEffect, useState } from "react";
import { useLoaderData } from "react-router";

export const AppContext = createContext({
  isSidepaneOpen: false,
  translations: [] as Translation[],
  isLoading: false,
  engine: "yoda",
  setIsLoading: (isLoading: boolean) => {},
  setEngine: (engine: Engine) => {},
  setTranslations: ([]) => {},
  toggleSidepane: () => {},
  handleClearStorage: () => {},
  handleDeleteTranslation: (id: string) => {},
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const translationsLoaderData = useLoaderData<Translation[]>();
  const [engine, setEngine] = useLocalStorage<Engine>("engine", "yoda");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidepaneOpen, setIsSidepaneOpen] = useState(!isMobile);
  const [translations, setTranslations] = useLocalStorage<Translation[]>(
    "translations",
    translationsLoaderData || []
  );

  useEffect(() => {
    if (!translationsLoaderData) return;
    setTranslations(translationsLoaderData);
  }, [translationsLoaderData]);

  useEffect(() => setIsSidepaneOpen(!isMobile), [isMobile]);

  const toggleSidepane = useCallback(
    () => setIsSidepaneOpen((isOpen) => !isOpen),
    []
  );

  const handleDeleteTranslation = useCallback(
    (id: string) => {
      const newTranslations = translations.filter(
        (t: Translation) => t.id !== id
      );
      setTranslations(newTranslations);
    },
    [translations]
  );

  const handleClearStorage = useCallback(() => setTranslations([]), []);

  return (
    <AppContext.Provider
      value={{
        isSidepaneOpen,
        translations,
        engine,
        setEngine,
        isLoading,
        setIsLoading,
        setTranslations,
        toggleSidepane,
        handleDeleteTranslation,
        handleClearStorage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
