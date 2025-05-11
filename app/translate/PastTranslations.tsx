import { useContext, useMemo } from "react";

import { AppContext } from "contexts/app.context";
import type { Translation } from "domain/types/Translation";
import TranslationItem from "./TranslationItem";

export default function PastTranslations() {
  const { translations } = useContext(AppContext);

  const groupedTranslations = useMemo(
    () =>
      translations.reduce((acc, translation) => {
        const date = new Date(translation.createdAt).toLocaleDateString();
        acc[date] ??= [];
        acc[date].push(translation);
        return acc;
      }, {} as Record<string, Translation[]>),
    [translations]
  );

  return (
    <>
      <div className="h-[72px] flex items-center px-4 border-b">
        <h2 className="text-lg font-bold">Past Translations</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {!(translations.length > 0) ? (
          <div className="p-4 text-center text-muted">No translations yet</div>
        ) : (
          <div>
            {Object.entries(groupedTranslations).map(([date, translations]) => (
              <div key={date} className="group mb-4">
                <p className="sticky bg-background top-0 px-2 py-1 text-xs text-muted">
                  {date}
                </p>
                <div>
                  {translations?.map((translation) => {
                    return (
                      <TranslationItem
                        key={translation.id}
                        translation={translation}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
