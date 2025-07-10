import './ItemDetail.css';
import { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../../context/context';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';
import Contador from '../Contador/Contador';

import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

function ItemDetail() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const productosCollection = collection(db, 'productos');
        const snapshot = await getDocs(productosCollection);
        const allProducts = snapshot.docs.map(doc => doc.data());

        // 🔍 Buscar producto por ID (que viene en la data, no es el ID de Firestore)
        const encontrado = allProducts.find(prod => prod.id === id);

        if (encontrado) {
          setProducto(encontrado);
        } else {
          toast.error('❌ Producto no encontrado');
        }
      } catch (error) {
        console.error(error);
        toast.error('⚠️ Error al cargar el producto');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAdd = () => {
    if (producto) {
      addToCart(producto, cantidad);
      toast.success(` "${producto.title}" agregado al carrito`, {
        position: 'top-right',
        autoClose: 1500,
      });
    }
  };

  if (loading) return <Loader />;

  if (!producto) return <p className="text-center my-5">Producto no disponible</p>;

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12 col-md-8 offset-md-2">
          <div className="card text-center p-4">
            <div className="card-image-container mb-3">
              <img src={producto.img} className="card-image" width="200" height="200" alt={producto.title} />
            </div>
            <div className="card-content">
              <h3 className="card-title">{producto.title}</h3>
              <p className="card-description">{producto.text}</p>
              <p className="card-description">Quedan {producto.stock} unidades en stock</p>
              <p className="card-price fw-bold fs-4">$ {producto.price}</p>

              <Contador cantidad={cantidad} setCantidad={setCantidad} />

              <div className="mt-3 d-flex justify-content-center gap-3">
                <button className="btn btn-success" onClick={handleAdd}>
                  Agregar al carrito
                </button>
                <Link to="/">
                  <button className="btn btn-outline-primary">Volver al inicio</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;