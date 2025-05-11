import type { FunTranslationApiResponse } from "io/types/FunTranslationTypes";

class CacheService<T> {
  private cache: Map<string, T>;

  constructor() {
    this.cache = new Map();
  }

  set(key: string, value: T): void {
    this.cache.set(key, value);
  }

  get(key: string): T | null {
    const item = this.cache.get(key);
    return item ?? null;
  }
}

const cacheService = new CacheService<FunTranslationApiResponse>();

export default cacheService;
