import { Route, Routes } from "react-router-dom";
import Annonces from "./pages/Annonces";
import Boutique from "./pages/Boutique";
import Erreur from "./pages/Erreur";
import Home from "./pages/Home";
import Identification from "./pages/identification";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/annonces" element={<Annonces />} />
      <Route path="/boutique" element={<Boutique />} />
      <Route path="/identification" element={<Identification />} />
      <Route path="*" element={<Erreur />} />
    </Routes>
  );
}
export default AppRoutes;
