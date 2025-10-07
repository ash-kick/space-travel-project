import { render, screen } from "@testing-library/react";
import { test, expect, describe, vi, beforeEach } from "vitest";
import Planets from "./Planets";

const { getPlanetsMock, mockUseSpacecrafts } = vi.hoisted(() => ({
     getPlanetsMock: vi.fn(),
     mockUseSpacecrafts: vi.fn(),
}));

vi.mock("../../services/SpaceTravelApi", () => ({
     default: { getPlanets: getPlanetsMock },
}));

vi.mock("../spacecrafts/SpaceCraftContext", () => ({
     useSpacecrafts: () => mockUseSpacecrafts(),
}));

beforeEach(() => {
     vi.clearAllMocks();
});

describe("Planets", () => {
     test("renders a planets heading", async () => {
          getPlanetsMock.mockResolvedValueOnce({ isError: false, data: [] });
          mockUseSpacecrafts.mockReturnValue({
               spacecrafts: [],
               sendSpacecraftToPlanet: vi.fn(),
          });
          render(<Planets />);
          expect(screen.getByRole("heading", { level: 2, name: /planets/i })).toBeInTheDocument();
     });

     test("shows the loading screen when loading"),
          () => {
               getPlanetsMock.mockReturnValue(new Promise(() => {}));
               mockUseSpacecrafts.mockReturnValue({
                    spacecrafts: [],
                    sendSpacecraftToPlanet: vi.fn(),
               });

               render(<Planets />);

               expect(screen.getByText(/loading\*s\.\.\./i)).toBeInTheDocument();
          };

     test("renders planets from api get planets function", async () => {
          getPlanetsMock.mockResolvedValueOnce({
               isError: false,
               data: [
                    { id: 1, name: "Mercury", currentPopulation: 100000, pictureUrl: "" },
                    { id: 2, name: "Venus", currentPopulation: 2, pictureUrl: "" },
               ],
          });

          mockUseSpacecrafts.mockReturnValue({
               spacecrafts: [
                    { id: "A1", name: "Marshmallow", capacity: 1, currentLocation: 1, pictureUrl: "" },
                    { id: "A2", name: "Tai", capacity: 2, currentLocation: 2, pictureUrl: "" },
               ],
          });

          render(<Planets />);

          expect(await screen.findByText(/mercury/i)).toBeInTheDocument();
          expect(await screen.findByText(/venus/i)).toBeInTheDocument();

          expect(await screen.getByText(/marshmallow/i)).toBeInTheDocument();
          expect(await screen.getByText(/tai/i)).toBeInTheDocument();
     });
});
