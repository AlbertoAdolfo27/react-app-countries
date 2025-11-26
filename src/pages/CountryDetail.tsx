import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import "../assets/styles/CountryDetail.css"



export default function CountryDetail() {
    const params = useParams();
    const code = params.code;
    const [country, setCountry] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false)

    async function getCountry() {
        setLoading(true)
        await fetch("https://restcountries.com/v3.1/alpha/" + code)
            .then((res) => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw new Error("An error occurs");
                }
            })
            .then((data) => {
                setCountry(data[0])
            })
            .catch((error) => {
                console.error(error)
            }).finally(() => setLoading(false))
    }


    useEffect(() => {
        getCountry()
    }, [])

    if (loading) return <h2 className="title">Carregando...</h2>

    if (country) {
        return (
            <>

                <div className="back">
                    <Link to="/">
                        <button>Voltar</button>
                    </Link>
                </div>
                <h1 className="title">{country.translations.por.common}</h1>

                <div className="country-attr">
                    <div>
                        <p className="fw-bold">Capital:</p>
                        <p>{country.capital}</p>
                    </div>
                    <div>
                        <p className="fw-bold">Região</p>
                        <p>{country.subregion}</p>
                    </div>
                    <div>
                        <p className="fw-bold">Bandeira</p>
                        <div className="d-flex">
                            <img src={country.flags.png} alt="Bandeira" width="150px" />
                            <p className="ps">{country.flags.alt}</p>
                        </div>
                    </div>
                    <div>
                        <p className="fw-bold">Brasao da República</p>
                        <img src={country.coatOfArms.png} alt="Bandeira" width="150px" />
                    </div>
                    <div>
                        <p className="fw-bold">População</p>
                        <p>{country.population}</p>
                    </div>
                </div>
            </>
        )
    } else {
        return <h2 className="title">Nenhum pais encontrado</h2>
    }
}