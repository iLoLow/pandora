import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Identification from "./pages/identification";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/identification" element={<Identification />} />
    </Routes>
  );
}
export default AppRoutes;
