import { z } from "zod";
import { PartialSpellSchema, SpellSchema } from "./schema";

export type PartialSpell = z.infer<typeof PartialSpellSchema>;
export type Spell = z.infer<typeof SpellSchema>;
export type FetchingState = "loading" | "success" | "error";
