import { GetAllSpellsSchema, GetSpellByIdSchema } from "./schema";
import { logError } from "./utils";

const BASE_URL = "https://www.dnd5eapi.co";

export async function getAllSpells() {
  const data = await fetch(BASE_URL + "/api/spells").then((response) =>
    response.json()
  );
  const result = GetAllSpellsSchema.safeParse(data);

  if (result.error) {
    logError(result.error);
    throw new Error();
  }

  return result.data;
}

export async function getSpellById(id: string) {
  const data = await fetch(BASE_URL + `/api/spells/${id}`).then((response) =>
    response.json()
  );
  const result = GetSpellByIdSchema.safeParse(data);

  if (result.error) {
    logError(result.error);
    throw new Error();
  }

  return result.data;
}
