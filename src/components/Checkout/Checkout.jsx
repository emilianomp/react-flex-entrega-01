import { useContext, useState } from 'react';
import { CartContext } from '../../context/context';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const { clearCart } = useContext(CartContext);
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
    } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(formData.email)) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      clearCart();
      toast.success('🎉 ¡Compra realizada con éxito!', {
        position: 'top-right',
        autoClose: 2000,
      });
      setTimeout(() => navigate('/'), 2200);
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4 text-center">Finalizar compra</h2>
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
  );
}

export default Checkout;