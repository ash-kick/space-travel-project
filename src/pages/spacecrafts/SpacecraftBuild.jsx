import { useState, useEffect } from "react";
import { useSpacecrafts } from "./SpacecraftContext";
import { useNavigate } from "react-router";

function SpacecraftBuild() {
     const [buildData, setBuildData] = useState({ name: "", capacity: "", description: "", pictureUrl: ["https://picsum.photos/200"] });
     const { buildSpacecraft } = useSpacecrafts();
     const [errors, setErrors] = useState({});
     const [showSuccessfulSubmit, setShowSuccessfulSubmit] = useState(false);
     const navigate = useNavigate();

     const handleChange = (e) => {
          const { name, value } = e.target;
          setBuildData((previous) => ({ ...previous, [name]: value }));
          if (errors[name]) setErrors((previous) => ({ ...previous, [name]: undefined }));
     };

     useEffect(() => {
          if (showSuccessfulSubmit) {
               const timer = setTimeout(() => {
                    setShowSuccessfulSubmit(false);
               }, 3000);
               return () => clearTimeout(timer);
          }
     }, [showSuccessfulSubmit]);

     function errorValidation(inputValues) {
          const newErrors = {};
          // errors for no name
          if (!inputValues.name.trim()) newErrors.name = "Name is required!";
          else if (inputValues.name.trim().length < 1) newErrors.name = "Name must be at least one character!";
          // errors for missing or invalid capacity
          const capacity = parseInt(inputValues.capacity, 10);
          if (inputValues.capacity === "") newErrors.capacity = "Capacity is required!";
          else if (Number.isNaN(capacity)) newErrors.capacity = "Capacity must be a number!";
          else if (capacity < 0) newErrors.capacity = "Capacity cannot be negative!";
          // errors for pictureUrl invalid URL
          const rawUrl = Array.isArray(inputValues.pictureUrl) ? inputValues.pictureUrl[0] : inputValues.pictureUrl;
          if (rawUrl) {
               try {
                    new URL(rawUrl);
               } catch {
                    newErrors.pictureUrl = "Picture URL must be a valid URL!";
               }
          }
          return newErrors;
     }

     const handleSubmit = (e) => {
          e.preventDefault();

          const newErrors = errorValidation(buildData);
          if (Object.values(newErrors).some(Boolean)) {
               setErrors(newErrors);
               return;
          }
          const finalBuildData = {
               ...buildData,
               capacity: parseInt(buildData.capacity, 10) || 0,
          };
          buildSpacecraft(finalBuildData);
          setShowSuccessfulSubmit(true);
          setBuildData({ name: "", capacity: "", description: "", pictureUrl: ["https://picsum.photos/200"] }); // reset
     };

     const goBack = () => {
          navigate("../");
     };

     return (
          <div>
               <div className="spacecraft-build">
                    <button
                         className="back-button"
                         onClick={goBack}>
                         Back
                    </button>
                    <form onSubmit={handleSubmit}>
                         <label htmlFor="name">Name:</label>
                         <input
                              type="text"
                              id="name"
                              name="name"
                              value={buildData.name}
                              onChange={handleChange}
                         />
                         <label htmlFor="capacity">Capacity:</label>
                         <input
                              type="number"
                              id="capacity"
                              name="capacity"
                              value={buildData.capacity}
                              onChange={handleChange}
                         />
                         <label htmlFor="description">Description: </label>
                         <textarea
                              id="description"
                              name="description"
                              rows="5"
                              cols="40"
                              value={buildData.description}
                              onChange={handleChange}></textarea>

                         <label htmlFor="pictureUrl">Picture Url:</label>
                         <input
                              type="url"
                              id="pictureUrl"
                              name="pictureUrl"
                              value={buildData.pictureUrl}
                              onChange={handleChange}
                         />
                         <button
                              className="build-button"
                              type="submit">
                              Build It!
                         </button>
                         {errors.name && (
                              <p
                                   id="name-error"
                                   className="spacecraft-form-error"
                                   role="alert">
                                   {errors.name}
                              </p>
                         )}
                         {errors.capacity && (
                              <p
                                   id="capacity-error"
                                   className="spacecraft-form-error"
                                   role="alert">
                                   {errors.capacity}
                              </p>
                         )}
                         {errors.pictureUrl && (
                              <p
                                   id="pictureurl-error"
                                   className="spacecraft-form-error"
                                   role="alert">
                                   {errors.pictureUrl}
                              </p>
                         )}
                    </form>
               </div>
               {showSuccessfulSubmit && (
                    <div className="build-success-message">
                         <p>Form submitted successfully!</p>
                    </div>
               )}
          </div>
     );
}

export default SpacecraftBuild;
