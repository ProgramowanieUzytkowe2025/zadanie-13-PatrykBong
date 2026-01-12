import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <nav>
      <ul>
        <li><Link to="/tabela-kursowa">Tabela kursowa</Link></li>
        <li><Link to="/cena-zlota">Cena złota</Link></li>
        <li><Link to="/autor">Autor</Link></li>
      </ul>
    </nav>
  );
}