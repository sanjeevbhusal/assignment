import { useEffect, useState } from "react";
import { LuLoader2 } from "react-icons/lu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getAllSpells } from "./api";
import { GetAllSpellsSchema } from "./schema";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { SpellList } from "./components/SpellList";
import { FetchingState, PartialSpell } from "./types";

function App() {
  const [spells, setSpells] = useState<PartialSpell[]>([]);
  const [favouriteSpells, setFavouriteSpells] = useState<PartialSpell[]>([]);
  const [fetchingState, setFetchingState] = useState<FetchingState>("loading");

  const [favouriteSpellIds] = useLocalStorage<string[]>(
    "favouriteSpellsId",
    []
  );

  useEffect(() => {
    const fetchSpells = async () => {
      try {
        const data = await getAllSpells();
        const validatedData = GetAllSpellsSchema.parse(data);

        // Showing spells that doesnot have name doesnot make sense. So we filter out those spells
        const filteredSpells =
          validatedData.results?.filter((spell) => spell.name) || [];
        setSpells(filteredSpells);
        setFetchingState("success");
      } catch (error) {
        setFetchingState("error");
      }
    };
    fetchSpells();
  }, []);

  useEffect(() => {
    const favouriteSpells = spells.filter((spell) =>
      spell.index ? favouriteSpellIds.includes(spell.index) : false
    );
    setFavouriteSpells(favouriteSpells);
  }, [spells, favouriteSpellIds]);

  if (fetchingState === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <LuLoader2 className="animate-spin" size={32} />
      </div>
    );
  }

  if (fetchingState === "error" || !spells) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Error occurred</p>
      </div>
    );
  }

  return (
    <main className="px-4 py-12 md:px-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl">Spell List</h1>
      </div>
      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">{`All Spells (${spells.length})`}</TabsTrigger>
          <TabsTrigger value="filtered">{`Favourite Spells (${favouriteSpells.length})`}</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <SpellList spells={spells} />
        </TabsContent>
        <TabsContent value="filtered" defaultChecked>
          <SpellList
            spells={favouriteSpells}
            noSpellsFoundMessage="No Favourite Spells Found"
          />
        </TabsContent>
      </Tabs>
    </main>
  );
}

export default App;
