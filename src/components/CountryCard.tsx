import { Link } from "react-router"
import "../assets/styles/CountryCard.css"

type cardProps = {
    name: string
    flag: string
    code: string
}

export default function CountryCard(props: cardProps) {
    return (
        <div className="card">
            <Link to={"/countries/" + props.code}>
                <img src={props.flag} alt="bandeira" width="120" />
                <p>{props.name}</p>
            </Link>
        </div>
    )
}