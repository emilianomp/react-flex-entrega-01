import { useState } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar.jsx'
import Cart from './components/Cart/Cart.jsx'
import Checkout from './components/Checkout/Checkout.jsx'
import CartWidget from './components/CartWidget/CartWidget.jsx'
import ItemListContainer from './components/ItemListContainer/ItemListContainer.jsx';
import Footer from './components/Footer/Footer.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ItemDetail from './components/ItemDetail/ItemDetail';
import AdminPanel from './components/AdminPanel/AdminPanel';
import { ContextProvider } from '/src/context/context';
import { ToastContainer } from 'react-toastify';
import './App.css';
//import { importarProductosAFirebase } from '/src/utils/firebaseImporter';

function App() {
  return (
    <ContextProvider>
      <ToastContainer />
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/categoria/:categoria" element={<ItemListContainer />} />
          <Route path="/detalle/:id" element={<ItemDetail />} />
          <Route path="/contacto" element={<h3 className='text-center m-4'>Esta es la sección de contacto</h3>} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<Link to="/" className='text-center'><button className='text-center btn btn-primary m-5'>Volvé al inicio</button></Link>} />
        </Routes>
      </BrowserRouter>
      {/* <div className="text-center"><button onClick={importarProductosAFirebase} className="btn btn-primary m-4">
        Importar productos de pesca a Firebase
      </button></div> */}
      <Footer />
     </ContextProvider>
  );
};

export default App;