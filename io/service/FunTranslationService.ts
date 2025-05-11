import { randomUUID } from "crypto";
import type { Engine } from "domain/types/Engine";
import type { Translation } from "domain/types/Translation";
import PirateTranslationRepo from "io/repo/PirateTranslationRepo";
import YodaTranslationRepo from "../repo/YodaTranslationRepo";

interface FunTranslationService {
  getTranslation(text: string): Promise<Translation>;
}

class DefaultFunTranslationService implements FunTranslationService {
  repo: YodaTranslationRepo | PirateTranslationRepo;

  constructor(repo: YodaTranslationRepo | PirateTranslationRepo) {
    this.repo = repo;
  }

  async getTranslation(text: string) {
    const response = await this.repo.getTranslation(text);
    const payload = await response.json();

    return {
      id: randomUUID(),
      text: payload.contents.text,
      translated: payload.contents.translated,
      engine: payload.contents.translation,
      createdAt: new Date().toISOString(),
    } as Translation;
  }
}

const getTranslationRepo = (engine: Engine) => {
  switch (engine) {
    case "pirate":
      return new PirateTranslationRepo();
    case "yoda":
    default:
      return new YodaTranslationRepo();
  }
};

const createDefaultFunTranslationService = (engine: Engine = "yoda") => {
  const translationRepo = getTranslationRepo(engine);
  const service = new DefaultFunTranslationService(translationRepo);

  return service;
};

export { createDefaultFunTranslationService, DefaultFunTranslationService };
