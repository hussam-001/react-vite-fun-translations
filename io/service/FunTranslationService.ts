import type { Engine } from "domain/types/Engine";
import type { Translation } from "domain/types/Translation";
import { fromDto } from "io/codec/fun-translation";
import PirateTranslationRepo from "io/repo/PirateTranslationRepo";
import type { FunTranslationApiResponse } from "io/types/FunTranslationTypes";

import YodaTranslationRepo from "../repo/YodaTranslationRepo";
import cacheService from "./CacheService";

interface FunTranslationService {
  getTranslation(text: string): Promise<Translation>;
}

class DefaultFunTranslationService implements FunTranslationService {
  repo: YodaTranslationRepo | PirateTranslationRepo;
  engine: Engine;

  constructor(
    repo: YodaTranslationRepo | PirateTranslationRepo,
    engine: Engine
  ) {
    this.repo = repo;
    this.engine = engine;
  }

  async getTranslation(text: string) {
    const cacheKey = `${this.engine}:${text}`.toLocaleLowerCase();

    let payload = cacheService.get(cacheKey) as FunTranslationApiResponse;
    if (!payload) {
      const response = await this.repo.getTranslation(text);
      payload = await response.json();
      cacheService.set(cacheKey, payload);
    }

    const translation = fromDto(payload);
    return translation;
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
  const service = new DefaultFunTranslationService(translationRepo, engine);

  return service;
};

export { createDefaultFunTranslationService, DefaultFunTranslationService };
