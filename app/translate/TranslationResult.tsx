import type { Translation } from "domain/types/Translation";

export default function TranslationResult({
  translation,
}: {
  translation: Translation;
}) {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-sm text-primary font-bold">
            {translation.engine.toUpperCase()}
          </span>
          <span className="text-xs text-muted">
            {new Date(translation.createdAt).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-sm text-muted mb-2">Original Text</p>
          <p className="text-primary text-lg">{translation.text}</p>
        </div>

        <div>
          <p className="text-sm text-muted mb-2">Translation</p>
          <p className="text-primary text-lg">{translation.translated}</p>
        </div>
      </div>
    </div>
  );
}
