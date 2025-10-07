import { Outlet } from "react-router-dom";

export default function SpacecraftLayout() {
     return (
          <div>
               <div>
                    <h2>Spacecrafts</h2>
               </div>
               <div className="page-content">
                    <Outlet />
               </div>
          </div>
     );
}
