import CartWidget from '../CartWidget/CartWidget.jsx'
import { IoFishOutline } from "react-icons/io5";

function NavBar() {

  return (
    <nav className="container navbar navbar-expand-lg navbar-light">
        <h1>
          <a className="navbar-brand fw-bold d-flex align-items-center" href="/">
            <IoFishOutline className="mx-2" /> FISH ROCK
          </a>
        </h1>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="mx-auto nav nav-pills">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/products">
                Products
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">
                About Us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">
                Contact
              </a>
            </li>
          </ul>
          <CartWidget cantidad={2} />
        </div>
      </nav>
  )
}

export default NavBar;