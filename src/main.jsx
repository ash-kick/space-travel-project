import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { SpacecraftProvider } from "./pages/spacecrafts/SpacecraftContext.jsx";

createRoot(document.getElementById("root")).render(
     <StrictMode>
          <SpacecraftProvider>
               <App />
          </SpacecraftProvider>
     </StrictMode>
);
