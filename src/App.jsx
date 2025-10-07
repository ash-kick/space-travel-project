import "./App.css";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import SpacecraftLayout from "./layouts/SpacecraftLayout";
import SpacecraftDetails from "./pages/spacecrafts/SpacecraftDetails";
import Spacecrafts from "./pages/spacecrafts/Spacecrafts";
import Planets from "./pages/planets/Planets";
import SpacecraftBuild from "./pages/spacecrafts/SpacecraftBuild";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter(
     createRoutesFromElements(
          <Route element={<RootLayout />}>
               <Route
                    index
                    element={<HomePage />}
               />
               <Route
                    path="spacecrafts"
                    element={<SpacecraftLayout />}>
                    <Route
                         index
                         element={<Spacecrafts />}
                    />
                    <Route
                         path="build"
                         element={<SpacecraftBuild />}
                    />
                    <Route
                         path="id/:id"
                         element={<SpacecraftDetails />}
                    />
               </Route>
               <Route
                    path="planets"
                    element={<Planets />}
               />
               <Route
                    path="*"
                    element={<NotFound />}
               />
          </Route>
     )
);

function App() {
     return <RouterProvider router={router}></RouterProvider>;
}

export default App;
