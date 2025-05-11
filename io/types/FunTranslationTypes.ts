import type { Engine } from "domain/types/Engine";

export type FunTranslationApiResponse = {
  success: {
    total: number;
  };
  contents: {
    text: string;
    translated: string;
    translation: Engine;
  };
};
