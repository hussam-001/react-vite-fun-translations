import { randomUUID } from "crypto";
import type { Translation } from "domain/types/Translation";
import YodaTranslationRepo from "../repo/YodaTranslationRepo";

interface FunTranslationService {
  getTranslation(text: string): Promise<Translation>;
}

class DefaultFunTranslationService implements FunTranslationService {
  repo: YodaTranslationRepo;

  constructor(repo: YodaTranslationRepo) {
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

const createDefaultFunTranslationService = () => {
  const yodaRepo = new YodaTranslationRepo();
  const service = new DefaultFunTranslationService(yodaRepo);

  return service;
};

export { createDefaultFunTranslationService, DefaultFunTranslationService };
