import type { Engine } from "./Engine";

type Translation = {
  id: string;
  text: string;
  translated: string;
  engine: Engine;
  createdAt: string;
};

export type { Translation };
