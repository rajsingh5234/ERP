import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { TOKEN, removeLocalStorageItem } from "../utils/LocalStroageManager";
import useOrders from "../hooks/useOrders";

const MainLayout = () => {

    useOrders();

    const [showNavbar, setShowNavbar] = useState(true);
    const navigate = useNavigate();

    const onLogout = () => {
        removeLocalStorageItem(TOKEN);
        navigate("/login")
    }

    return (
        <>
            <Navbar showNavbar={showNavbar} setShowNavbar={setShowNavbar} onLogout={onLogout} />
            <div className="p-4 md:ml-64 bg-slate-100 rounded-lg flex flex-col">
                <Header setShowNavbar={setShowNavbar} onLogout={onLogout} />
                <Outlet />
            </div>
        </>
    )
}

export default MainLayout