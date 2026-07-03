import { Link, Outlet } from 'react-router-dom'
import '../../App.css'

export default function MainLayout(){
    return (
        <div className="appShell">
            <header className="appHeader">
                <div className="appHeaderInner">
                    <div className="brand">
                        <span className="brandTitle">Citizen Registry</span>
                        <span className="brandSubtitle">Панель учета граждан</span>
                    </div>

                    <nav className="mainNav" aria-label="Основная навигация">
                        <Link to='/'>Dashboard</Link>
                        <Link to='/citizens'>Граждане</Link>
                    </nav>
                </div>
            </header>

            <main className="mainContent">
                <Outlet />
            </main>

            <footer className="appFooter">
                <div className="appFooterInner">
                    <span>Рестр граждан</span>
                    <span className="appFooterBadge">Сделал: Цыбулькин Степан</span>
                </div>
            </footer>
        </div>
    )
}
