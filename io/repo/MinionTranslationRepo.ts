import { FUN_TRANSLATION_API_URL } from "io/constants";

class MinionTranslationRepo {
  async getTranslation(text: string) {
    const response = await fetch(`${FUN_TRANSLATION_API_URL}/minion.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    return response;
  }
}

export default MinionTranslationRepo;
