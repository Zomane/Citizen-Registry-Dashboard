import { Link, Outlet } from "react-router-dom";
import '../../App.css'

export default function MainLayout(){
    return (
        <div>
            <nav>
                <Link to='/'>Dashboard</Link>
                <Link to='/citizens'>Пользователи</Link>
            </nav>

            <Outlet />

            <footer>...</footer>
        </div>
    )
}