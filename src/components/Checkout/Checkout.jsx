import { useContext, useState } from 'react';
import { CartContext } from '../../context/context';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

function Checkout() {
  const { cart, clearCart, getTotal } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    celular: '',
    comentario: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};

    if (!formData.nombre.trim()) err.nombre = 'Nombre y apellido requerido';
    if (!formData.email.trim()) {
      err.email = 'Email requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      err.email = 'Email inválido';
    }

    if (!formData.celular.trim()) {
      err.celular = 'Celular requerido';
    } else if (!/^[0-9]+$/.test(formData.celular)) {
      err.celular = 'Sólo números en celular';
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const orden = {
      cliente: {
        nombre: formData.nombre,
        email: formData.email,
        celular: formData.celular,
        comentario: formData.comentario,
      },
      productos: cart.map((prod) => ({
        id: prod.id,
        title: prod.title,
        cantidad: prod.quantity,
        precio: prod.price,
      })),
      total: getTotal(),
      fecha: Timestamp.fromDate(new Date()),
    };

    try {
      const ordenesCollection = collection(db, 'ordenes');
      const docRef = await addDoc(ordenesCollection, orden);

      toast.success(`🎉 Compra realizada con éxito. N° orden: ${docRef.id}`, {
        position: 'top-right',
        autoClose: 3000,
      });

      clearCart();
      setTimeout(() => navigate('/'), 3200);
    } catch (error) {
      console.error('Error al guardar la orden:', error);
      toast.error('❌ Hubo un error al guardar tu orden. Intenta de nuevo.');
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Finalizar compra</h2>

      <div className="row">
        {/* 📝 Columna 1: Formulario */}
        <div className="col-md-6">
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label">Nombre y Apellido</label>
              <input
                type="text"
                className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{errors.nombre}</div>
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{errors.email}</div>
            </div>

            <div className="mb-3">
              <label className="form-label">Celular</label>
              <input
                type="text"
                className={`form-control ${errors.celular ? 'is-invalid' : ''}`}
                name="celular"
                value={formData.celular}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{errors.celular}</div>
            </div>

            <div className="mb-3">
              <label className="form-label">Comentario (opcional)</label>
              <textarea
                className="form-control"
                name="comentario"
                value={formData.comentario}
                onChange={handleChange}
              />
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-success mt-3">
                Finalizar compra
              </button>
            </div>
          </form>
        </div>

        {/* 🛒 Columna 2: Detalle del carrito */}
        <div className="col-md-6">
          <h4 className="mb-3">Detalle de tu compra</h4>
          {cart.length === 0 ? (
            <p>No hay productos en el carrito.</p>
          ) : (
            <ul className="list-group">
              {cart.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between">
                  <div>
                    <strong>{item.title}</strong> <br />
                    Cantidad: {item.quantity}
                  </div>
                  <span className="fw-bold">
                    ${item.price && item.quantity ? item.price * item.quantity : 0}
                  </span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between">
                <strong>Total:</strong>
                <strong>${getTotal()}</strong>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;