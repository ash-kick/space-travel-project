import SpaceTravelApi from "../../services/SpaceTravelApi";

import { useState, useEffect, useContext, createContext } from "react";

const SpacecraftContext = createContext(null);
export const useSpacecrafts = () => useContext(SpacecraftContext);

export function SpacecraftProvider({ children }) {
     const [spacecrafts, setSpacecrafts] = useState([]);
     const [loading, setLoading] = useState(false);

     useEffect(() => {
          (async () => {
               setLoading(true);
               const res = await SpaceTravelApi.getSpacecrafts();
               if (!res.isError) setSpacecrafts(res.data);
               setLoading(false);
          })();
     }, []);

     async function buildSpacecraft(buildData) {
          const results = await SpaceTravelApi.buildSpacecraft(buildData);
          if (!results.isError) {
               setSpacecrafts((spacecraftList) => [...spacecraftList, results.data]);
          }
          return results;
     }

     async function getSpacecraftById(id) {
          return await SpaceTravelApi.getSpacecraftById({ id });
     }

     async function destroySpacecraft(id) {
          const results = await SpaceTravelApi.destroySpacecraftById({ id });
          if (!results.isError) setSpacecrafts((spacecraftList) => spacecraftList.filter((spacecraft) => spacecraft.id !== id));
          return results;
     }

     async function sendSpacecraftToPlanet(spacecraftId, targetPlanetId) {
          const targetIdNum = Number(targetPlanetId);
          const results = await SpaceTravelApi.sendSpacecraftToPlanet({
               spacecraftId,
               targetPlanetId: Number(targetPlanetId),
          });

          if (!results.isError) {
               setSpacecrafts((list) => list.map((s) => (s.id === spacecraftId ? { ...s, currentLocation: targetIdNum } : s)));
          }
          return results;
     }

     return <SpacecraftContext.Provider value={{ spacecrafts, loading, buildSpacecraft, getSpacecraftById, destroySpacecraft, sendSpacecraftToPlanet }}>{children}</SpacecraftContext.Provider>;
}
