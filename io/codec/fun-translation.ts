import { randomUUID } from "crypto";

import type { Engine } from "domain/types/Engine";
import type { Translation } from "domain/types/Translation";

import type { FunTranslationApiResponse } from "../types/FunTranslationTypes";

export const fromDto = (some: FunTranslationApiResponse): Translation => {
  return {
    id: randomUUID(),
    text: some.contents.text,
    translated: some.contents.translated,
    engine: some.contents.translation as Engine,
    createdAt: new Date().toISOString(),
  };
};
