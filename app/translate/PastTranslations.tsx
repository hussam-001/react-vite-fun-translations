import { useContext, useMemo } from "react";
import { Link } from "react-router";

import { AppContext } from "contexts/app.context";
import type { Translation } from "domain/types/Translation";
import Button from "view/components/Button";
import Trash2Icon from "view/svg/Trash2Icon";

export default function PastTranslations() {
  const { translations, handleClearStorage, handleDeleteTranslation } =
    useContext(AppContext);

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
          <div className="p-4 text-center text-gray-400">
            No translations yet
          </div>
        ) : (
          <div>
            {Object.entries(groupedTranslations).map(([date, translations]) => (
              <div key={date} className="group">
                <div className="sticky top-0 px-4 py-2 text-xs text-muted border-b">
                  {date}
                </div>
                <div className="divide-y">
                  {translations?.map((translation) => {
                    const text = translation.text.slice(0, 25);
                    return (
                      <Link
                        key={translation.id}
                        to={`/translate/${translation.id}`}
                        className="flex items-center justify-between p-3 hover:bg-primary/10 w-full"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">
                              {translation.engine.toLocaleUpperCase()}
                            </span>
                            <span className="text-xs text-gray-400 group-hover/item:text-gray-300">
                              {new Date(
                                translation.createdAt
                              ).toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-muted">
                            {text}
                            {translation.text.length !== text.length && "..."}
                          </p>
                        </div>
                        <Button
                          title="Delete translation"
                          variant="icon"
                          className="hover:bg-red-400/10 hover:text-red-400"
                          onClick={() =>
                            handleDeleteTranslation(translation.id)
                          }
                        >
                          <Trash2Icon />
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="p-4 border-t border-gray-700">
        <Button
          variant="danger"
          className="w-full bg-transparent"
          onClick={handleClearStorage}
        >
          <Trash2Icon />
          <span>Clear History</span>
        </Button>
      </div>
    </>
  );
}
