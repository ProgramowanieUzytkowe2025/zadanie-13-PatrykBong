import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SzczegolyWaluty() {
    const {waluta} = useParams();
    const [dane, setDane] = useState(null);
    const [error, setError] = useState("");
        
    const [kwota, setKwota] = useState("");
    const [data, setData] = useState("");
    const [wynik, setWynik] = useState(null);

    useEffect(() => {
        fetch(`https://api.nbp.pl/api/exchangerates/rates/A/${waluta}/`).then((res) => {
            if (!res.ok) throw new Error(`Błąd HTTP: ${res.status}`);
            return res.json();
        }).then((data) => {
            setDane(data);
            setError("");
        }).catch((err) => {
            setError("BŁĄD WCZYTYWANIA DANYCH: " + err.message);
        });
    }, [waluta]);

    const szukajDaty = async (waluta, data) => {
        let dataObj = new Date(data);

        while (true) {
            const yyyy = dataObj.getFullYear();
            const mm = String(dataObj.getMonth() + 1).padStart(2, "0");
            const dd = String(dataObj.getDate()).padStart(2, "0");
            const dateStr = `${yyyy}-${mm}-${dd}`;

            try {
                const res = await fetch(
                    `https://api.nbp.pl/api/exchangerates/rates/A/${waluta}/${dateStr}/`
                );

                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                
                const json = await res.json();
                return json.rates[0].mid;
            } catch (err) {
                dataObj.setDate(dataObj.getDate() - 1);
            }
        }
    };

    const przelicz = async (e) => {
        e.preventDefault();

        try {
            const kurs = await szukajDaty(waluta, data);
            setWynik((parseFloat(kwota) * kurs).toFixed(2));
        } catch (err) {
            setError("BŁĄD WCZYTYWANIA DANYCH: " + err.message);
            setWynik(null);
        }
    };

    return (
        <div>
            <h2>Szczegóły waluty</h2>
            {error && <div>{error}</div>}
            {!error && dane && (
            <div>
                <p>Nazwa: <strong>{dane.currency}</strong></p>
                <p>Kurs: <strong>{dane.rates[0].mid}</strong></p>
                
                <h3>Przelicz walutę na PLN</h3>
                <form onSubmit={przelicz}>

                    Kwota:
                    <input type="number" value={kwota} onChange={(e) => setKwota(e.target.value)}/>

                    <br/>

                    Data:
                    <input type="date" value={data} onChange={(e) => setData(e.target.value)}/>

                    <br />
                    <button type="submit">Przelicz</button>
                </form>

                {wynik && (
                    <p> Wartość w PLN: {wynik} zł </p>
                )}
            </div>
            )}
        </div>
    );
}
