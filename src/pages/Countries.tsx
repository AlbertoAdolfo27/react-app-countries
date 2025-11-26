import { useEffect, useState } from "react"
import CountryCard from "../components/CountryCard"



export default function Countries() {
    const [countries, setCountries] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false)

    async function listCountries() {
        setLoading(true)
        await fetch("https://restcountries.com/v3.1/all?fields=name,flags,cca2,translations ")
            .then((res) => {
                if (res.ok) {
                    return res.json()
                } else {
                    console.error(res)
                    throw new Error("An error occurs");
                }

            })
            .then((data) => {
                setCountries(data)
            })
            .catch((error) => {
                console.error(error)
            }).finally(()=>setLoading(false))
    }

    useEffect(() => {
        listCountries()
    }, [])

    if (loading) return (
        <>
            <h1 className="title">Países</h1>
            <h2 className="title">Carregando...</h2>
        </>
    )

    if (countries) {
        return (
            <>
                <h1 className="title">Países</h1>
                {
                    countries.map((country: any) => {
                        return <CountryCard key={country.cca2} name={country.translations.por.common} flag={country.flags.png} code={country.cca2} />
                    })
                }
            </>
        )
    } else {
        return <h2 className="title">Nenhum pais encontrado</h2>
    }
}
