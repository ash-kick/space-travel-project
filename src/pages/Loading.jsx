import { ClipLoader } from "react-spinners";

const Loading = () => {
     return (
          <div className="loading-message">
               <ClipLoader
                    color="white"
                    size={60}
               />
               <p>Loading ...</p>
          </div>
     );
};

export default Loading;
