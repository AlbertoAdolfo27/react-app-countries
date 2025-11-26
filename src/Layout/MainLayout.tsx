import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/styles/App.css"



export default function MainLayout() {
    return (
        <>
            <Header />
            <main className="main">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}