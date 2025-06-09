import './ItemListContainer.css';
import Item from '../Item/Item.jsx'
import getProducts from '../../services/mockService';
import { useState, useEffect } from 'react';
import Loader from '../Loader/Loader.jsx';
import { useParams } from 'react-router';

function ItemListContainer() {

    const [allProducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { categoria } = useParams();

    const filterProducts = (arrayProducts, category) => {
        if (category) {
            setProducts(arrayProducts.filter(el => el.category === categoria));
        } else {
            setProducts(arrayProducts);
        };
    };

    useEffect(() => {
        if (allProducts.length === 0) {
            setLoading(true);
            getProducts()
                .then(result => {
                    setAllProducts(result);
                    filterProducts(result, categoria);
                    setLoading(false);

                }).catch((err) => { alert(err) });
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