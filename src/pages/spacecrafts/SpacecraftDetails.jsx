import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSpacecrafts } from "./SpacecraftContext";
import Loading from "../Loading";

export default function SpacecraftDetails() {
     const [spacecraft, setSpacecraft] = useState(null);
     const [loading, setLoading] = useState(true);
     const { id } = useParams();
     const { getSpacecraftById } = useSpacecrafts();

     useEffect(() => {
          async function fetchSpacecraft() {
               try {
                    setLoading(true);
                    const response = await getSpacecraftById(id);
                    if (!response.isError) {
                         setSpacecraft(response.data);
                    } else {
                         setSpacecraft(null);
                    }
               } catch (error) {
                    console.error(error);
                    setSpacecraft(null);
               } finally {
                    setLoading(false);
               }
          }
          fetchSpacecraft();
     }, [id]);

     return loading ? (
          <Loading />
     ) : spacecraft ? (
          <div className="spacecraft-detail-by-id">
               {spacecraft.pictureUrl ? <img src={spacecraft.pictureUrl} /> : <p>🚀</p>}
               <p className="spacecraft-detail-name">
                    <strong>Name:</strong> {spacecraft.name}
               </p>
               <p className="spacecraft-detail-capacity">
                    <strong>Capacity:</strong> {spacecraft.capacity}
               </p>
               <p className="spacecraft-detail-description">
                    <strong>Description:</strong> {spacecraft.description}
               </p>
          </div>
     ) : (
          <p>Error: Spacecraft not found!</p>
     );
}
