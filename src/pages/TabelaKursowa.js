import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function TabelaKursowa() {
    const [kursy, setKursy] = useState([]);
    const [data, setData] = useState("");
    const [tabela, setTabela] = useState("A");
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`https://api.nbp.pl/api/exchangerates/tables/${tabela}/`).then((response) => response.json()).then((data) => {
            setKursy(data[0].rates);
            setData(data[0].effectiveDate);
            setError("");
        }).catch((err) => {
            setError("BŁĄD WCZYTYWANIA DANYCH Z API NBP: "+err.message);
            setKursy([]);
            setData("");
        });
    }, [tabela]);

    return (
        <div>
        <h2>Tabela kursów walut</h2>

        <label>
            Rodzaj tabeli:
            <select value={tabela} onChange={(e) => setTabela(e.target.value)}>
            <option value="A">Tabela A</option>
            <option value="B">Tabela B</option>
            <option value="C">Tabela C</option>
            </select>
        </label>

        {error && <div>{error}</div>}

        {!error && (
            <div>
            <p>Data notowania: <strong>{data}</strong></p>

            <table border="1">
                <thead>
                <tr>
                    <th>Waluta</th>
                    <th>Kod</th>
                    <th>Kurs (PLN)</th>
                </tr>
                </thead>
                <tbody>
                {kursy.map((waluta) => (
                    <tr key={waluta.code}>
                        <td>{waluta.currency}</td>
                        <td>
                            <Link to={`/tabela-kursowa/${waluta.code}`}>
                                {waluta.code}
                            </Link>
                        </td>
                        <td>{waluta.mid ?? waluta.ask}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}
        </div>
    );
}