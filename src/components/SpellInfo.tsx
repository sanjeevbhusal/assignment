import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { z } from "zod";
import { getSpellById } from "../api";
import { SpellSchema } from "../schema";
import { LuLoader2 } from "react-icons/lu";
import { IoMdArrowBack, IoMdHeartEmpty } from "react-icons/io";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { toast } from "sonner";

type Spell = z.infer<typeof SpellSchema>;
type FetchingState = "loading" | "success" | "error";

function SpellInfo() {
  const [spell, setSpell] = useState<Spell | undefined>();
  const [fetchingState, setFetchingState] = useState<FetchingState>("loading");

  const params = useParams();
  const spellId = params.spellId;

  const [favouriteSpellsId, setFavouriteSpellsId] = useLocalStorage<string[]>(
    "favouriteSpellsId",
    []
  );

  useEffect(() => {
    const fetchSpell = async (spellId: string) => {
      try {
        const data = await getSpellById(spellId);
        setSpell(data);
        setFetchingState("success");
      } catch (error) {
        setFetchingState("error");
      }
    };

    if (spellId) {
      fetchSpell(spellId);
    }
  }, [spellId]);

  if (fetchingState === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <LuLoader2 className="animate-spin" size={32} />
      </div>
    );
  }

  // If the api call has finished but spell is still undefined or different from what we expect, we show the error
  if (fetchingState === "error" || !spell) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Error occurred</p>
      </div>
    );
  }

  const isFavourite = spell.index
    ? favouriteSpellsId.includes(spell.index)
    : false;

  return (
    <main className="w-full max-w-4xl px-4 py-12 mx-auto sm:px-6 lg:px-8 md:py-16">
      <Link
        to="/spells"
        className="flex items-center gap-2 p-2 mb-4 border border-white rounded-md hover:border-black w-fit"
      >
        <IoMdArrowBack />
        <span>Go Back</span>
      </Link>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            {spell.name || "Unknown"}
          </h1>
          {isFavourite ? (
            <button
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50"
              onClick={() => {
                if (spell.index) {
                  const updatedFavouriteSpellsId = favouriteSpellsId.filter(
                    (id) => id !== spell.index
                  );
                  setFavouriteSpellsId(updatedFavouriteSpellsId);
                  toast.success("Spell has been removed from favourites");
                }
              }}
            >
              <IoMdHeartEmpty size={18} fill="red" />
              <span className="underline">Saved</span>
            </button>
          ) : (
            <button
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50"
              onClick={() => {
                if (spell.index) {
                  setFavouriteSpellsId([spell.index, ...favouriteSpellsId]);
                  toast.success("Spell has been saved to favourites");
                }
              }}
            >
              <IoMdHeartEmpty size={18} />
              <span className="underline">Save To Favourites</span>
            </button>
          )}
        </div>
        {spell.desc &&
          spell.desc.length > 0 &&
          spell.desc.map((d) => <p className="mb-2">{d}</p>)}

        {spell.higher_level && spell.higher_level.length > 0 && (
          <div>
            <h2 className="text-xl font-bold">At Higher Levels</h2>
            {spell.higher_level.map((l) => (
              <p className="mt-2">{l}</p>
            ))}
          </div>
        )}

        <div>
          <h2 className="mb-2 text-xl font-bold">Other Properties</h2>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              {spell.range && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Range:</span>
                  {spell.range}
                </div>
              )}
              {spell.components && spell.components.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Components:</span>
                  {spell.components.map((component, index) => {
                    const isLastComponent = spell.components
                      ? spell.components.length === index + 1
                      : false;

                    return (
                      <span>
                        {component}
                        {!isLastComponent && ","}
                      </span>
                    );
                  })}
                </div>
              )}

              {spell.material && (
                <div className="flex gap-2">
                  <span className="font-medium">Material:</span>
                  <span>{spell.material}</span>
                </div>
              )}

              {spell.area_of_effect?.type && (
                <div className="flex gap-2">
                  <span className="font-medium">Effect Type:</span>
                  <span>{spell.area_of_effect.type}</span>
                </div>
              )}

              {spell.area_of_effect?.size && (
                <div className="flex gap-2">
                  <span className="font-medium">Effect area Size:</span>
                  <span>{spell.area_of_effect.size}</span>
                </div>
              )}

              {spell.ritual && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Ritual:</span>
                  <span>{spell.ritual.toString()}</span>
                </div>
              )}

              {spell.duration && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Duration:</span>
                  <span>{spell.duration} </span>
                </div>
              )}

              {spell.concentration && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Concentration:</span>
                  <span>{spell.concentration.toString()}</span>
                </div>
              )}

              {spell.casting_time && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Casting Time:</span>
                  <span>{spell.casting_time}</span>
                </div>
              )}

              {spell.level && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Level:</span>
                  <span>{spell.level}</span>
                </div>
              )}

              {spell.school?.name && (
                <div className="flex gap-2">
                  <span className="font-medium">School Name:</span>
                  <span>{spell.school.name}</span>
                </div>
              )}

              {spell.school?.level && (
                <div className="flex gap-2">
                  <span className="font-medium">School Level:</span>
                  <span>{spell.school.level}</span>
                </div>
              )}

              {spell.classes && spell.classes.length > 0 && (
                <div className="flex gap-2">
                  <span className="font-medium">Classes:</span>
                  <span>
                    {spell.classes
                      ?.filter((c) => c.name)
                      .map((c, index) => {
                        const isLastClass = spell.classes
                          ? spell.classes.length === index + 1
                          : false;
                        return (
                          <span>
                            {c.name}
                            {!isLastClass && ","}
                          </span>
                        );
                      })}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export { SpellInfo };
