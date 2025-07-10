import { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

function AdminPanel() {
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'ordenes'));
        const ordenesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setOrdenes(ordenesData);
      } catch (err) {
        console.error('Error cargando órdenes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdenes();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Panel de Órdenes</h2>

      {loading ? (
        <p>Cargando órdenes...</p>
      ) : ordenes.length === 0 ? (
        <p>No hay órdenes registradas.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID Orden</th>
                <th>Cliente</th>
                <th>Contacto</th>
                <th>Comentario</th>
                <th>Productos</th>
                <th>Total</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {ordenes.map((orden) => (
                <tr key={orden.id}>
                  <td>{orden.id}</td>
                  <td>{orden.cliente?.nombre} <br /> <small>{orden.cliente?.email}</small></td>
                  <td>{orden.cliente?.celular}</td>
                  <td>{orden.cliente?.comentario || '-'}</td>
                  <td>
                    <ul className="mb-0">
                      {orden.productos.map((p, i) => (
                        <li key={i}>
                          {p.title} (x{p.cantidad}) – ${p.precio * p.cantidad}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td><strong>${orden.total}</strong></td>
                  <td>{orden.fecha?.toDate().toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
