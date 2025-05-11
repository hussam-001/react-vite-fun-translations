import { useContext } from "react";
import { Link, useParams } from "react-router";

import clsx from "clsx";
import { AppContext } from "contexts/app.context";
import type { Translation } from "domain/types/Translation";
import Button from "view/components/Button";
import Trash2Icon from "view/svg/Trash2Icon";

export default function TranslationItem({
  translation,
}: {
  translation: Translation;
}) {
  const { id } = useParams();
  const { handleDeleteTranslation } = useContext(AppContext);
  const text = translation.text.slice(0, 20);

  return (
    <Link
      key={translation.id}
      to={`/translate/${translation.id}`}
      className={clsx(
        "flex items-center justify-between p-2 w-full",
        id === translation.id ? "bg-background border-y" : "hover:bg-primary/5"
      )}
    >
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold">
            {translation.engine.toLocaleUpperCase()}
          </span>
          <span className="text-xs text-muted">
            {new Date(translation.createdAt).toLocaleTimeString()}
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
        onClick={() => handleDeleteTranslation(translation.id)}
      >
        <Trash2Icon />
      </Button>
    </Link>
  );
}
