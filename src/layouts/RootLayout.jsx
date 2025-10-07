import React from "react";
import { NavLink, Outlet } from "react-router-dom";
// import BreadCrumbs from "../components/BreadCrumbs";

export default function RootLayout() {
     return (
          <div className="root-layout">
               <header>
                    <nav>
                         <NavLink to="/">🌎 Home</NavLink>
                         <NavLink to="spacecrafts">🚀 Spacecrafts</NavLink>
                         <NavLink to="planets">🪐 Planets</NavLink>
                    </nav>
                    <h1>Space Travel</h1>
               </header>
               <main>
                    <Outlet />
               </main>
          </div>
     );
}
