import { PartialSpellSchema } from "@/schema";
import { Link } from "react-router-dom";
import { z } from "zod";

type PartialSpell = z.infer<typeof PartialSpellSchema>;

interface SpellList {
  spells: PartialSpell[];
  noSpellsFoundMessage?: string;
}

function SpellList({ spells, noSpellsFoundMessage }: SpellList) {
  return (
    <div>
      {spells.length === 0 ? (
        <p className="pt-8 text-lg text-center">
          {noSpellsFoundMessage || "No Spells Found"}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {spells.map((spell, index) => {
            return (
              <Link to={`/spells/${spell.index}`}>
                <div
                  key={spell.index || index}
                  className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg"
                >
                  <div className="p-4">
                    <h2 className="text-xl font-bold">{spell.name || "N/A"}</h2>
                    <p className="mt-2 text-gray-500">
                      Level: {spell.level || "N/A"}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export { SpellList };
