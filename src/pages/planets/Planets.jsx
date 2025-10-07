import SpaceTravelApi from "../../services/SpaceTravelApi";
import { useState, useEffect } from "react";
import { useSpacecrafts } from "../spacecrafts/SpacecraftContext";
import Loading from "../Loading";

function Planets() {
     const [loading, setLoading] = useState(false);
     const [planets, setPlanets] = useState([]);
     const { spacecrafts, sendSpacecraftToPlanet } = useSpacecrafts();

     async function fetchPlanets() {
          try {
               setLoading(true);
               const response = await SpaceTravelApi.getPlanets();
               if (!response.isError) {
                    setPlanets(response.data.map((planet) => ({ ...planet })));
               }
          } catch (error) {
               console.error(error);
          } finally {
               setLoading(false);
          }
     }

     useEffect(() => {
          fetchPlanets();
     }, []);

     async function handleChangePlanet(currentPlanetId, clickedSpacecraftId) {
          const newPlanetList = planets.filter((planet) => planet.id !== currentPlanetId);
          let randomPlanet = Number(newPlanetList[Math.floor(Math.random() * newPlanetList.length)].id);
          const result = await sendSpacecraftToPlanet(clickedSpacecraftId, randomPlanet);
          if (!result?.isError) {
               await fetchPlanets();
          }
     }

     function spacecraftOnPlanet(planetId) {
          const spacecraftsOnPlanet = spacecrafts.filter((spacecraft) => String(spacecraft.currentLocation) === String(planetId));
          return spacecraftsOnPlanet.map((spacecraft) => (
               <div
                    className="spacecraft-planet-detail"
                    key={spacecraft.id}
                    onClick={() => handleChangePlanet(planetId, spacecraft.id)}>
                    {spacecraft.pictureUrl ? (
                         <img
                              className="planet-spacecraft-image"
                              src={spacecraft.pictureUrl}
                         />
                    ) : (
                         <p className="planet-spacecraft-image-icon">🚀</p>
                    )}
                    <div className="planet-spacecraft-name-capacity">
                         <p className="planet-spacecraft-name">{spacecraft.name}</p>
                         <p className="planet-spacecraft-capacity">{spacecraft.capacity}</p>
                    </div>
               </div>
          ));
     }

     return (
          <div>
               <div>
                    <h2>Planets</h2>
               </div>
               <div className="page-content">
                    {loading ? (
                         <Loading />
                    ) : (
                         planets.map((planet) => (
                              <div
                                   className="planet"
                                   key={planet.id}>
                                   <div className="planet-card">
                                        <img
                                             src={planet.pictureUrl}
                                             className="planet-image"
                                        />
                                        <div className="planet-name-population">
                                             <p className="planet-name">{planet.name}</p>
                                             <p className="planet-population">{planet.currentPopulation}</p>
                                        </div>
                                   </div>
                                   <div className="spacecraft-planet-list">{spacecraftOnPlanet(planet.id)}</div>
                              </div>
                         ))
                    )}
               </div>
          </div>
     );
}

export default Planets;
