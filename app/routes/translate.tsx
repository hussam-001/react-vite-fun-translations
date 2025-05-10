import { createDefaultFunTranslationService } from "io/service/FunTranslationService";
import { useActionData } from "react-router";
import Content from "view/components/Content";
import Sidepane from "view/components/Sidepane";
import { TranslateForm } from "../translate/form";
import type { Route } from "./+types/translate";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export const action = async ({ request }) => {
  const translationService = createDefaultFunTranslationService();
  const translation = await translationService.getTranslation("placeholder");
  // should I do something with that request?

  return translation;
};

export default function Translate() {
  const translation = useActionData();

  return (
    <div className="flex h-full">
      <Sidepane>It would be nice to see past translations here.</Sidepane>
      <Content>
        <TranslateForm />
        <p>{JSON.stringify(translation)}</p>
      </Content>
    </div>
  );
}
