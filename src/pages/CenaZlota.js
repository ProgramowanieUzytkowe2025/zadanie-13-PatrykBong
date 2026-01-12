import { useEffect, useState } from "react";

export default function CenaZlota() {
  const [cena, setCena] = useState(null);

  useEffect(() => {
    fetch("https://api.nbp.pl/api/cenyzlota").then((response) => response.json()).then((data) => {
        setCena(data[0].cena);
      }).catch((error) => {
        setCena(error.message)
      });
  }, []);

  return (
    <div>
      <h2>Aktualna cena złota</h2>
      <p> Cena złota wynosi {cena} PLN </p>
    </div>
  );
}