import { useState, useEffect } from "react";
import { useParams } from "react-router";
import "../assets/styles/CountryDetail.css"
import BackButton from "../components/BackBotton";

type Country = {
    name: { common: string }
    cca2: string
    flags: {
        png: string
        alt: string
    }
    translations: { por: { common: string } }
    population: string
    coatOfArms: { png: string }
    capital: string
    subregion: string
}

export default function CountryDetail() {
    const params = useParams();
    const code = params.code;
    const [country, setCountry] = useState<Country | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<String>("")

    const getCountry = async () => {
        try {
            setError("")
            setLoading(true)
            const res = await fetch("https://restcountries.com/v3.1/alpha/" + code)

            if (!res.ok) {
                console.log(res)
                setError("Ocorreu algum erro")
                return
            }

            const data: Country[] = await res.json()
            setCountry(data[0])

        } catch (error) {
            setError("Ocorreu algum erro")
            console.error("Error", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getCountry()
    }, [])

    if (error.length > 0) return <h2 className="title">Erro: {error}</h2>

    if (loading) return <h2 className="title">Carregando...</h2>

    if (country) {
        return (
            <>
                <BackButton />
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
                        <img src={country.flags.png} alt="Bandeira" width="150px" />
                        <p className="ps">{country.flags.alt}</p>
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
    }

    return (
        <>
            <BackButton />
            <h2 className="title">Nenhum pais encontrado</h2>
        </>
    )
}
