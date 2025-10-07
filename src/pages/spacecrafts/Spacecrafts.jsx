import { Link, useNavigate } from "react-router-dom";
import { useSpacecrafts } from "./SpacecraftContext";
import Loading from "../Loading";

function Spacecrafts() {
     const { spacecrafts, loading, destroySpacecraft } = useSpacecrafts();
     const navigate = useNavigate();

     async function handleDestroy(e, id) {
          e.preventDefault();
          e.stopPropagation();
          await destroySpacecraft(id);
     }

     const handleClick = () => {
          navigate("build");
     };

     return (
          <div>
               <button
                    className="build-spacecraft-button"
                    onClick={handleClick}>
                    Build a Spacecraft
               </button>
               {loading ? (
                    <Loading />
               ) : (
                    spacecrafts.map((spacecraft) => (
                         <Link
                              className="spacecraft-list-item"
                              key={spacecraft.id}
                              to={`id/${spacecraft.id}`}>
                              <div className="spacecraft-icon-details">
                                   {spacecraft.pictureUrl ? (
                                        <img
                                             className="spacecraft-list-icon"
                                             src={spacecraft.pictureUrl}
                                        />
                                   ) : (
                                        <div className="spacecraft-list-icon">🚀</div>
                                   )}
                                   <div className="spacecraft-list-details">
                                        <p>{spacecraft.name}</p>
                                        <p>Capacity: {spacecraft.capacity}</p>
                                        <p>Current Location: {spacecraft.currentLocation}</p>
                                   </div>
                              </div>
                              <button onClick={(e) => handleDestroy(e, spacecraft.id)}>💥 Destroy</button>
                         </Link>
                    ))
               )}
          </div>
     );
}

export default Spacecrafts;
