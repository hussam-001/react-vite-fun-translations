import { createDefaultFunTranslationService } from "io/service/FunTranslationService";
import { useActionData } from "react-router";
import Content from "view/components/Content";
import Header from "view/components/Header";
import { Sidepane } from "view/components/Sidepane";
import TranslationResult from "~/translate/TranslationResult";
import { TranslateForm } from "../translate/form";
import type { Route } from "./+types/translate";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export const action = async ({ request }: Route.ActionArgs) => {
  const translationService = createDefaultFunTranslationService();
  const translation = await translationService.getTranslation("placeholder");
  // should I do something with that request?

  return translation;
};

export default function Translate() {
  const translation = useActionData();

  return (
    <div className="flex h-full bg-background">
      <Sidepane>
        <div className="h-[72px] flex items-center px-4 border-b">
          <h2 className="text-lg font-bold">Past Translations</h2>
        </div>
      </Sidepane>
      <Content>
        <Header title="Fun Translations" />
        <div className="flex-1 overflow-y-auto">
          {translation && <TranslationResult translation={translation} />}
        </div>
        <TranslateForm />
      </Content>
    </div>
  );
}
