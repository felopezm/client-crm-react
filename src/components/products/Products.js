import React, { useEffect, useState, useContext, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';

import clientAxios from '../../config/axios';
import Spinner from '../layout/Spinner';
import Product from './Product';
import { CRMContext } from '../../context/CRMContex';

const Products = (props) => {
    // context
    const [auth, saveAuth] = useContext(CRMContext);

    // products = state
    const [products, saveProducts] = useState([]);

    const queryApi = async () => {
        try {
            const queryProducts = await clientAxios.get('/products', {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            saveProducts(queryProducts.data);
        } catch (error) {
            // error token 
            if (error.response.status === 500) {
                props.history.push('/login');
            }
        }
    }

    useEffect(() => {
        if (auth.token !== '') {
            queryApi();
        } else {
            props.history.push('/login');
        }
    }, []);

    if (!auth.auth)
        props.history.push('/login');

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

export default withRouter(Products);