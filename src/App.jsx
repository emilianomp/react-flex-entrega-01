import { useState } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar.jsx'
import CartWidget from './components/CartWidget/CartWidget.jsx'
import ItemListContainer from './components/ItemListContainer/ItemListContainer.jsx';
import Footer from './components/Footer/Footer.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ItemDetail from './components/ItemDetail/ItemDetail';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<ItemListContainer />} />
        <Route path="/categoria/:categoria" element={<ItemListContainer />} />
        <Route path="/detalle/:id" element={<ItemDetail />} />
        <Route path="/contacto" element={<h3 className='text-center m-4'>Esta es la sección de contacto</h3>} />
        <Route path="*" element={<Link to="/"><button className='text-center btn btn-primary m-5'>Volvé al inicio</button></Link>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;