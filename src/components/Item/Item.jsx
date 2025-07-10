// import { Link } from 'react-router';
// import { useAppContext } from '../../context/context';
// import './Item.css';

// // function Item({ id, price, title, img }) {
// function Item({ id, price, title }) {

//     const { agregarAlCarrito } = useAppContext();

//     return (
//         <div className="card">
//             <div className="card-image-container">
//                 {/* <img src={img} className="card-img-top" width="150" height="150" alt="product img" /> */}
//             </div>
//             <div className="card-body">
//                 <h3 className="card-title">{title}</h3>
//                 <div>
//                     <p className="card-price">$ {price}</p>
//                 </div>
//                 <Link to={`/detalle/${id}`}>
//                     <button className="card-button btn btn-primary mr-4">Ver detalle</button>
//                 </Link>
//                 {/* <button className="card-button btn btn-primary" onClick={() => console.log("Vas a agregar al carrito a", title)}>Agregar al carrito</button> */}
//                 <button className="card-button btn btn-primary"
//                     onClick={() => agregarAlCarrito({ id, price, title, cantidad: 1 })}>
//                     Agregar al carrito
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default Item;



import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/context';
import { toast } from 'react-toastify';
import './Item.css';

function Item({ id, price, title }) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    const item = { id, price, title };
    addToCart(item, 1);
    toast.success(`✅ "${title}" agregado al carrito`, {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
  };

  return (
    <div className="card">
      <div className="card-image-container">
        {/* Imagen opcional: <img src={img} className="card-img-top" width="150" height="150" alt={title} /> */}
      </div>
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-price">$ {price}</p>
        <Link to={`/detalle/${id}`}>
          <button className="card-button btn btn-primary me-2">Ver detalle</button>
        </Link>
        <button className="card-button btn btn-success" onClick={handleAddToCart}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

export default Item;
