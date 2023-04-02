import { Route, Routes } from "react-router-dom";
import Annonces from "./pages/Annonces";
import Boutique from "./pages/Boutique";
import Erreur from "./pages/Erreur";
import Accueil from "./pages/Accueil";
import Identification from "./pages/Identification";
import Rejoindre from "./pages/Rejoindre";
import Partenariat from "./pages/Partenariat";
import TableauDeBord from "./pages/TableauDeBord";
import { useSelector } from "react-redux";

function AppRoutes() {

  const user = useSelector((state) => state.user);
  return (
    <Routes>
      <Route path="/" element={<Accueil />} />
      <Route path="/annonces" element={<Annonces />} />
      <Route path="/rejoindre" element={<Rejoindre />} />
      <Route path="/boutique" element={<Boutique />} />
      <Route path="/partenariat" element={<Partenariat />} />
      <Route path="/identification" element={<Identification />} />
      <Route path="/tableaudebord/*" element={user ? <TableauDeBord /> : <Identification />} />
      <Route path="*" element={<Erreur />} />
    </Routes>
  );
}
export default AppRoutes;
