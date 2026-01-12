import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./Menu";
import TabelaKursowa from "./pages/TabelaKursowa";
import SzczegolyWaluty from "./pages/SzczegolyWaluty";
import CenaZlota from "./pages/CenaZlota";
import Autor from "./pages/Autor";

export default function App() {
  return (
    <BrowserRouter>
      <Menu />

      <Routes>
        <Route path="/tabela-kursowa" element={<TabelaKursowa />} />
        <Route path="/tabela-kursowa/:waluta" element={<SzczegolyWaluty />} />
        <Route path="/cena-zlota" element={<CenaZlota />} />
        <Route path="/autor" element={<Autor />} />
      </Routes>
    </BrowserRouter>
  );
}