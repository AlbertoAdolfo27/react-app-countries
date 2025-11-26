import { Link } from "react-router";
import "../assets/styles/Header.css"

export default function Header() {
    return (
        <header>
            <nav className="nav">
                <ul>
                    <li>
                        <Link to={'/'}>Início</Link>
                    </li>
                    <li>
                        <Link to={'/about'}>Sobre</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}