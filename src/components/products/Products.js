import React, { useEffect, useState, Fragment} from 'react';
import { Link } from 'react-router-dom';
import clientAxios from '../../config/axios';
import Spinner from '../layout/Spinner';

import Product from './Product';

const Products = () => {

    // products = state
    const [products, saveProducts] = useState([]);

    useEffect(() => {
        const queryApi = async () => {
            const queryProducts = await clientAxios.get('/products');
            saveProducts(queryProducts.data);
        }

        queryApi();
    }, []);

    if (!products.length) return <Spinner />

    return (
        <Fragment>
            <h2>Products</h2>

            <Link to={'/products/new'} className="btn btn-verde nvo-cliente">
                <i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </Link>

            <ul className="listado-productos">
                {products.map(product => (
                    <Product
                        key={product._id}
                        product={product}
                    />
                ))}
            </ul>
        </Fragment>
    );
}

export default Products;