import { z } from "zod";

export const PartialSpellSchema = z.object({
  index: z.string().optional(),
  name: z.string().optional(),
  level: z.number().optional(),
  url: z.string().optional(),
});

export const SpellSchema = PartialSpellSchema.extend({
  desc: z.array(z.string()).optional(),
  higher_level: z.array(z.string()).optional(),
  range: z.string().optional(),
  components: z.array(z.string()).optional(),
  area_of_effect: z
    .object({
      size: z.number().optional(),
      type: z.enum(["sphere", "cone", "cylinder", "line", "cube"]).optional(),
    })
    .optional(),
  material: z.string().optional(),
  ritual: z.boolean().optional(),
  duration: z.string().optional(),
  concentration: z.boolean().optional(),
  casting_time: z.string().optional(),
  school: z
    .object({
      index: z.string().optional(),
      level: z.number().optional(),
      name: z.string().optional(),
      url: z.string().optional(),
    })
    .optional(),
  classes: z
    .array(
      z.object({
        index: z.string().optional(),
        level: z.number().optional(),
        name: z.string().optional(),
        url: z.string().optional(),
      })
    )
    .optional(),
});

export const GetAllSpellsSchema = z.object({
  count: z.number().optional(),
  results: z.array(PartialSpellSchema).optional(),
});
export const GetSpellByIdSchema = SpellSchema;
