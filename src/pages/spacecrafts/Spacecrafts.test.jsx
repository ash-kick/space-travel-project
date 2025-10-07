import { render, screen } from "@testing-library/react";
import { test, expect, describe, vi, beforeEach } from "vitest";
import Spacecrafts from "./Spacecrafts";
import { MemoryRouter } from "react-router-dom";

const { mockUseSpacecrafts } = vi.hoisted(() => ({
     mockUseSpacecrafts: vi.fn(),
}));

vi.mock("./SpacecraftContext", () => ({
     useSpacecrafts: () => mockUseSpacecrafts(),
}));

beforeEach(() => {
     vi.clearAllMocks();
});

describe("Spacecrafts", () => {
     test("shows the loading screen when loading"),
          () => {
               mockUseSpacecrafts.mockReturnValue({
                    spacecrafts: [],
                    sendSpacecraftToPlanet: vi.fn(),
               });
               render(<Spacecrafts />);
               expect(screen.getByText(/loading\*s\.\.\./i)).toBeInTheDocument();
          };

     test("check if spacecrafts render", () => {
          mockUseSpacecrafts.mockReturnValue({
               spacecrafts: [
                    { id: "A1", name: "Marshmallow", capacity: 1, currentLocation: 1, pictureUrl: "" },
                    { id: "A2", name: "Tai", capacity: 2, currentLocation: 2, pictureUrl: "" },
               ],
          });
          render(
               <MemoryRouter>
                    <Spacecrafts />
               </MemoryRouter>
          );
          expect(screen.getByText(/marshmallow/i)).toBeInTheDocument();
          expect(screen.getByText(/tai/i)).toBeInTheDocument();
     });
});
