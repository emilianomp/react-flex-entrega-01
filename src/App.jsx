import { useState } from 'react'
import NavBar from './components/NavBar/NavBar.jsx'
import CartWidget from './components/CartWidget/CartWidget.jsx'
import ItemListContainer from './components/ItemListContainer/ItemListContainer.jsx';
import Footer from './components/Footer/Footer.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {

  return (
      <div className="container" id="efw_container">
        <header className="bg-light shadow-sm">
          <NavBar />
        </header>
        <main>
          <ItemListContainer saludation="Bienvenido al E-commerce Fish Rock" />
        </main>
        <Footer />
      </div>
  )
}

export default App;