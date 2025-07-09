import './ItemListContainer.css';
import Item from '../Item/Item.jsx'
import getProducts from '../../services/mockService';
import { useState, useEffect } from 'react';
import Loader from '../Loader/Loader.jsx';
import { useParams } from 'react-router';
import { db } from "../../firebaseConfig.js"
import { collection, getDocs, addDoc} from "firebase/firestore"

function ItemListContainer() {

    const [allProducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const productosCollection = collection(db, 'productos');

    const { categoria } = useParams();

    const filterProducts = (arrayProducts, category) => {
        if (category) {
            setProducts(arrayProducts.filter(el => el.category === categoria));
        } else {
            setProducts(arrayProducts);
        };
    };

    const cargarProductoNuevo = () => {

        const nuevoProducto = {
            id: "2",
            title : "Remera nodeJS",
            text: "La mejor remera de Coderhouse ideal para los que quieren ser desarrolladores backend",
            price: 10,
            img: "https://http2.mlstatic.com/D_NQ_NP_746746-MLA74709082839_022024-O.webp",
            stock: 55,
            category: "otros"
        }

        addDoc(productosCollection, nuevoProducto);
    }


    const [carrito, setcarrito] = useState([])
    
    
    const agregarAlCarrito = (producto) => {
        console.log("ACA VA EL NUEVO CARRITO")
        setcarrito([...carrito, produto]);
    }




    useEffect(() => {
        if (allProducts.length === 0) {
            
            setLoading(true);
            getDocs(productosCollection)
                .then(snapshot => {
                    const arrayDeProductos = snapshot.docs.map(el => el.data());
                    //console.log("Este es mi array de productos", arrayDeProductos);
                        setAllProducts(arrayDeProductos);
                        filterProducts(arrayDeProductos, categoria);
                        setLoading(false);

                })
                .catch(err => console.error(err));
            
            // getProducts()
            //     .then(result => {
            //         setAllProducts(result);
            //         filterProducts(result, categoria);
            //         setLoading(false);

            //     }).catch((err) => { alert(err) });
        } else {
            filterProducts(allProducts, categoria);
        };
    }, [categoria]);

    return (
        <div className="container">
            <div  style={{ display: "flex", justifyContent: "space-evenly", marginTop: "2rem" }}>
                {
                    loading ? <Loader />
                        :
                        products.length > 0 ?
                            products.map(elem =>
                                <Item
                                    key={elem.id}
                                    {...elem}
                                />)
                            :
                            <p>No se encontraron productos</p>
                }
            </div>
        </div>
    );
};


export default ItemListContainer;