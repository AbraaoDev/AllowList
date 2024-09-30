import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { CreateTripPage } from "./pages/consulta";
import { TripProvider } from "./contexts/useTrip";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <TripProvider>
        <CreateTripPage />
      </TripProvider>
    ),
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
