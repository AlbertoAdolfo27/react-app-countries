import { useEffect, useState } from "react"
import CountryCard from "../components/CountryCard"
import "../assets/styles/Home.css"
import BackButton from "../components/BackBotton"

type Country = {
    name: { common: string }
    cca2: string
    flags: { png: string }
    translations: { por: { common: string } }
}

export default function Countries() {
    const [countries, setCountries] = useState<Country[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const [searchTerm, setSearchTerm] = useState<string>("")

    const listCountries: Function = async () => {
        try {
            setError("")
            setLoading(true)

            const res = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,cca2,translations")

            if (!res.ok) {
                setCountries([])
                console.log(res)
                return
            }

            const data: Country[] = await res.json()
            setCountries(data)

        } catch (error) {
            setError("Ocorreu algum erro")
            console.error("Error", error)
        } finally {
            setLoading(false)
        }
    }

    const searchCountries: Function = async () => {
        if (searchTerm.trim() === "") {
            listCountries()
            return
        }
        try {
            setError("")
            setLoading(true)

            const res = await fetch("https://restcountries.com/v3.1/name/" + searchTerm + "?fields=name,flags,cca2,translations")

            if (!res.ok) {
                setCountries([])
                console.log(res)
                return
            }

            const data: Country[] = await res.json()
            setCountries(data)

        } catch (error) {
            setError("Ocorreu algum erro")
            console.error("Error", error)
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        listCountries()
    }, [])


    if (error.length > 0) return <h2 className="title">Erro: {error}</h2>

    if (loading) return <h2 className="title">Carregando...</h2>

    if (countries.length > 0) {
        return (
            <>
                <h1 className="title">Países</h1>
                <SearchConteiner searchTerm={searchTerm} setSearchTerm={setSearchTerm} searchCountries={searchCountries} />

                {
                    countries.map((country: Country) => {
                        return <CountryCard key={country.cca2} name={country.translations.por.common} flag={country.flags.png} code={country.cca2} />
                    })
                }
            </>
        )
    }
    return (
        <>
            <div style={{ width: "95%", margin: "auto", paddingBottom: "10px" }}>
                <BackButton reload={true} />
            </div>
            <SearchConteiner searchTerm={searchTerm} setSearchTerm={setSearchTerm} searchCountries={searchCountries} />

            <h2 className="title">Nenhum pais encontrado</h2>
        </>
    )
}


type PropsSeachConteiner = {
    searchTerm: string
    setSearchTerm: Function
    searchCountries: Function
}

function  SearchConteiner(props: PropsSeachConteiner) {
     return  (
        <>
            <div className="search-container">
                <input value={props.searchTerm} type="text" placeholder="Pesquisar país" onChange={(e) => { props.setSearchTerm(e.target.value) }} />
                <button onClick={() => { props.searchCountries() }}>Pesquisar</button>
            </div>
        </>
    )
}
