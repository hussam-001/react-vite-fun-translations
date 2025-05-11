import { AppContext } from "contexts/app.context";
import type { Engine } from "domain/types/Engine";
import { createDefaultFunTranslationService } from "io/service/FunTranslationService";
import { useContext, useMemo } from "react";
import { isRouteErrorResponse, redirect, useParams } from "react-router";
import ResultSkeleton from "~/translate/ResultSkeleton";
import { TranslateForm } from "~/translate/TranslateForm";
import TranslationResult from "~/translate/TranslationResult";
import type { Route } from "./+types/translate";

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const text = formData.get("text") as string;
  const engine = formData.get("engine") as Engine;
  const translationService = createDefaultFunTranslationService(engine);
  const translation = await translationService.getTranslation(text);
  return translation;
};

export const clientAction = async ({
  serverAction,
}: Route.ClientActionArgs) => {
  const data = await serverAction();
  const translationsStr = localStorage.getItem("translations");
  const translations = translationsStr ? JSON.parse(translationsStr) : [];
  localStorage.setItem("translations", JSON.stringify([data, ...translations]));
  return redirect(`/translate/${data.id}`);
};

export default function Translate() {
  const { id } = useParams();
  const { translations, isLoading } = useContext(AppContext);

  const selectedTranslation = useMemo(() => {
    return translations.find((t) => t.id === id);
  }, [translations, id]);

  return (
    <>
      <div className="flex-1 overflow-y-auto">
        {isLoading && <ResultSkeleton />}
        {!isLoading && selectedTranslation && (
          <TranslationResult translation={selectedTranslation} />
        )}
      </div>
      <TranslateForm />
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const errorView = isRouteErrorResponse(error) ? (
    <>
      <h2 className="text-2xl font-bold text-primary">
        {error.status} {error.statusText}
      </h2>
      <p>{error.data}</p>
    </>
  ) : error instanceof Error ? (
    <>
      <h2 className="text-2xl font-bold text-primary">Oops!</h2>
      <p>{error.message || "Something went wrong"}</p>
    </>
  ) : (
    <p>Something went wrong</p>
  );

  return (
    <>
      <div className="flex-1 overflow-y-auto flex items-center justify-center max-w-3xl mx-auto flex-col p-4 gap-2 text-red-500">
        {errorView}
      </div>
      <TranslateForm />
    </>
  );
}
