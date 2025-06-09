import { Link } from 'react-router';
import CartWidget from '../CartWidget/CartWidget';
import './NavBar.css';
import { IoFishOutline } from "react-icons/io5";

function NavBar() {
    return (
        <nav style={{ display: "flex", justifyContent: "space-around", backgroundColor: "bisque" }}>
            <a className="navbar-brand fw-bold d-flex align-items-center" href="/">
                <IoFishOutline className="mx-2" /> FISH ROCK
            </a>
            <ul style={{ display: "flex", listStyle: "none", gap: "2rem" }}>
                <li>
                    <Link to="/">
                        Productos
                    </Link>
                </li>
                <li>
                    <Link to="/categoria/javascript">
                        JavaScript
                    </Link>
                </li>
                <li>
                    <Link to="/categoria/otros">
                        Otros
                    </Link>
                </li>
                <li>
                    <Link to="/contacto">
                        Contacto
                    </Link>
                </li>
            </ul>
            <CartWidget cantidad={2} />
        </nav>
    );
};

export default NavBar;