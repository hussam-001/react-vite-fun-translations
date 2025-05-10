import { AppContext } from "contexts/app.context";
import { createDefaultFunTranslationService } from "io/service/FunTranslationService";
import { useContext, useMemo } from "react";
import { redirect, useParams } from "react-router";
import Content from "view/components/Content";
import Header from "view/components/Header";
import { Sidepane } from "view/components/Sidepane";
import PastTranslations from "~/translate/PastTranslations";
import TranslationResult from "~/translate/TranslationResult";
import { TranslateForm } from "../translate/TranslateForm";
import type { Route } from "./+types/translate";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const text = formData.get("text") as string;
  const translationService = createDefaultFunTranslationService();
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
  const { translations } = useContext(AppContext);

  const selectedTranslation = useMemo(() => {
    return translations.find((t) => t.id === id);
  }, [translations, id]);

  return (
    <div className="flex h-full bg-background">
      <Sidepane>
        <PastTranslations />
      </Sidepane>
      <Content>
        <Header title="Fun Translations" />
        <div className="flex-1 overflow-y-auto">
          {selectedTranslation && (
            <TranslationResult translation={selectedTranslation} />
          )}
        </div>
        <TranslateForm />
      </Content>
    </div>
  );
}
