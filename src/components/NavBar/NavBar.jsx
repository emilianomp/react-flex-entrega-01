import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';
import { IoFishOutline } from 'react-icons/io5';
import './NavBar.css';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

function NavBar() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const productosSnapshot = await getDocs(collection(db, 'productos'));
        const categoriasUnicas = new Set();
        productosSnapshot.forEach(doc => {
          const producto = doc.data();
          if (producto.category) {
            categoriasUnicas.add(producto.category);
          }
        });
        setCategorias([...categoriasUnicas].sort());
      } catch (err) {
        console.error('Error al cargar categorías:', err);
      }
    };

    fetchCategorias();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-warning px-3">
        <div className="container">
            <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
                <IoFishOutline className="me-2" />
                VAMOS AL PIQUE 
            </Link>

            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Inicio</Link>
                    </li>

                    <li className="nav-item dropdown">
                        <span className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
                        Categorías
                        </span>
                        <ul className="dropdown-menu">
                            {categorias.map((cat, i) => (
                                <li key={i}>
                                <Link to={`/categoria/${cat}`} className="dropdown-item text-capitalize">
                                    {cat}
                                </Link>
                                </li>
                            ))}
                        </ul>
                    </li>

                    <li className="nav-item">
                        <Link to="/contacto" className="nav-link">Contacto</Link>
                    </li>
                </ul>
                <CartWidget />
            </div>
        </div>
    </nav>
  );
}

export default NavBar;