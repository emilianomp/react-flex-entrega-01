
import { useContext } from 'react';
import { CartContext } from '../../context/context';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';

function Cart() {
  const navigate = useNavigate();
  const { cart, removeItem, clearCart, updateQuantity, getTotal } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="container text-center my-5">
        <h3>El carrito está vacío</h3>
        <Link to="/" className="btn btn-primary mt-3">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4">Carrito de compras</h2>
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>${item.price}</td>
              <td>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="btn btn-sm btn-outline-secondary me-1"
                  disabled={item.quantity <= 1}
                >−</button>
                {item.quantity}
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="btn btn-sm btn-outline-secondary ms-1"
                >+</button>
              </td>
              <td>${item.price * item.quantity}</td>
              <td>
                <button
                  onClick={() => removeItem(item.id)}
                  className="btn btn-danger btn-sm"
                >Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 className="text-end">Total: ${getTotal()}</h4>

      <div className="d-flex justify-content-between mt-4">
        <button onClick={clearCart} className="btn btn-outline-danger">
          Vaciar carrito
        </button>
        <button onClick={() => navigate('/checkout')} className="btn btn-success">
          Finalizar compra
        </button>
      </div>
    </div>
  );
}

export default Cart;