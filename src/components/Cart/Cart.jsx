import { useState } from 'react';
import { useContext } from 'react';
import { CartContext } from '../../context/context';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Cart.css';

function Cart() {
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const navigate = useNavigate();
  const { cart, removeItem, clearCart, updateQuantity, getTotal } = useContext(CartContext);

  const handleConfirmClearCarrito = () => {
    clearCart();
    toast.info('🗑️ Carrito vaciado correctamente', {
      position: 'top-right',
      autoClose: 2000,
    });
  };

  if (cart.length === 0) {
    return (
      <div className="container text-center my-5">
        <h3>El carrito está vacío</h3>
        <Link to="/" className="btn btn-primary mt-3">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <>
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
                    className="btn btn-danger btn-sm"
                    onClick={() => setProductoAEliminar(item)}
                    data-bs-toggle="modal"
                    data-bs-target="#confirmRemoveItemModal"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4 className="text-end">Total: ${getTotal()}</h4>

        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-danger me-2"
            data-bs-toggle="modal"
            data-bs-target="#confirmClearModal"
          >
            Vaciar carrito
          </button>

          <button onClick={() => navigate('/checkout')} className="btn btn-success">
            Finalizar compra
          </button>
        </div>
      </div>

      {/* 🔔 Modal de confirmación  - Boton Vaciar carrito */}
      <div className="modal fade" id="confirmClearModal" tabIndex="-1" aria-labelledby="confirmClearModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="confirmClearModalLabel">¿Vaciar carrito?</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div className="modal-body">
              Esta acción eliminará todos los productos del carrito. ¿Estás seguro?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" className="btn btn-danger" onClick={handleConfirmClearCarrito} data-bs-dismiss="modal">
                Vaciar carrito
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 🔔 Modal de confirmación - Boton Eliminar */}
      <div className="modal fade" id="confirmRemoveItemModal" tabIndex="-1" aria-labelledby="confirmRemoveItemModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="confirmRemoveItemModalLabel">¿Eliminar producto?</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div className="modal-body">
              {productoAEliminar ? (
                <>
                  ¿Querés eliminar <strong>{productoAEliminar.title}</strong> del carrito?
                </>
              ) : (
                'Producto no seleccionado.'
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => {
                  if (productoAEliminar) {
                    removeItem(productoAEliminar.id);
                    toast.info(`🗑️ ${productoAEliminar.title} eliminado`, {
                      position: 'top-right',
                      autoClose: 2000,
                    });
                    setProductoAEliminar(null);
                  }
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>


    </>
  );
}

export default Cart