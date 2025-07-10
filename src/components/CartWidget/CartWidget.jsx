import { FiShoppingCart } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/context";
import './CartWidget.css';

function CartWidget() {
  const { cart } = useContext(CartContext);
  const cantidadTotal = cart.reduce((acc, item) => acc + item.quantity, 0);

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (cantidadTotal > 0) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cantidadTotal]);

  return (
    <div className="efw_cartWidget d-flex align-items-center ms-3">
      <Link to="/carrito" className="nav-link position-relative">
        <FiShoppingCart size={24} />
        {cantidadTotal > 0 && (
          <span
            className={`position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger ${
              animate ? 'pop' : ''
            }`}
            style={{ fontSize: '0.7rem' }}
          >
            {cantidadTotal}
          </span>
        )}
      </Link>
    </div>
  );
}

export default CartWidget;
