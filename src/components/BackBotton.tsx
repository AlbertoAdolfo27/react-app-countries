import { Link } from "react-router";
import "../assets/styles/BackButton.css";

type BackButtonProps = {
    reload?: boolean
}
export default function BackButton(props: BackButtonProps) {
    return (
        <>
            <div className="back">
                {props.reload ? (
                    <a href="/">
                        <button type="button">Voltar</button>
                    </a>
                ) : (
                    <Link to="/">
                        <button type="button">Voltar</button>
                    </Link>
                )}

            </div>
        </>
    )
}