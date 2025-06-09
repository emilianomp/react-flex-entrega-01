// import { Link } from 'react-router';
import { Link, useParams } from 'react-router';
import './ItemDetail.css';
import { useEffect, useState } from 'react';
import getProducts from '../../services/mockService';
import Loader from '../Loader/Loader';
import Contador from '../Contador/Contador';

function ItemDetail() {

    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [producto, setProducto] = useState({});

    useEffect(() => {
        getProducts()
            .then(result => {
                const product = result.find(el => el.id === id);
                setProducto(product);
                setLoading(false);

            }).catch((err) => { alert(err) });
    }, [])

    return (
        loading ? <Loader /> :
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6 offset-md-3">
                        <div className="card text-center m-5 p-4">
                            <div className="card-image-container">
                                <img src={producto.img} className="card-image" width="150" height="150" alt="product img" />
                            </div>
                            <div className="card-content">
                                <h3 className="card-title">{producto.title}</h3>
                                <p className="card-description">{producto.text}</p>
                                <p className="card-description">Quedan {producto.stock} unidades en stock!</p>
                                <div>
                                    <p className="card-price">$ {producto.price}</p>
                                </div>
                                <Link to={`/`}>
                                    <button className="card-button btn btn-primary">Volver al inicio</button>
                                </Link>
                                <Contador />
                                <button className="card-button btn btn-primary">Agregar al carrito</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default ItemDetail;


// <div className="card">
//     <div className="card-image-container">
//         <img src={img} className="card-image" width="150" height="150" alt="product img" />
//     </div>
//     <div className="card-content">
//         <h3 className="card-title">{title}</h3>
//         <p className="card-description">{text}</p>
//         <div>
//             <p className="card-price">$ {price}</p>
//         </div>
//         <Link to={`detalle/${id}`}>
//             <button className="card-button">Ver detalle</button>
//         </Link>
//         <button className="card-button" onClick={() => console.log("Vas a agregar al carrito a", title)}>Agregar al carrito</button>
//     </div>
// </div>