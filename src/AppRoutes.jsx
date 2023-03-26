import { Route, Routes } from "react-router-dom";
import Annonces from "./pages/Annonces";
import Boutique from "./pages/Boutique";
import Erreur from "./pages/Erreur";
import Accueil from "./pages/Accueil";
import Identification from "./pages/Identification";
import Rejoindre from "./pages/Rejoindre";
import Inscription from "./pages/Inscription";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Accueil />} />
      <Route path="/annonces" element={<Annonces />} />
      <Route path="/rejoindre" element={<Rejoindre />} />
      <Route path="/boutique" element={<Boutique />} />
      <Route path="/identification" element={<Identification />} />
      <Route path="Inscription" element={<Inscription />} />
      <Route path="*" element={<Erreur />} />
    </Routes>
  );
}
export default AppRoutes;
