import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/context';
import { toast } from 'react-toastify';
import './Item.css';

function Item({ id, price, title, img, category }) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    const item = { id, price, title, category };
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
      <div className="card-image-container text-center">
        <img src={img} className="card-img-top w-auto" width="180" alt={title} />
      </div>
      <div className="card-body">
        <h4 className="card-title">{title}</h4>
        <h5 className="card-price my-3">$ {price}</h5>
        <p className="card-category my-3"><small>CATEGORIA:</small> <strong>{category}</strong></p>
        <Link to={`/detalle/${id}`}>
          <button className="card-button btn btn-outline-primary me-2">Ver detalle</button>
        </Link>
        <button className="card-button btn btn-outline-primary" onClick={handleAddToCart}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

export default Item;