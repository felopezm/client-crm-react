import React, { useState, useEffect, Fragment } from 'react';
import Swal from 'sweetalert2';
import clientAxios from '../../config/axios';
import { withRouter } from 'react-router-dom';

import FormSearchProduct from './FormSearchProduct';
import FormQuantityProduct from './FormQuantityProduct';

const NewOrder = (props) => {

    const { id } = props.match.params;
    const [client, dataClient] = useState({});
    const [search, saveSearch] = useState('');
    const [products, saveProducts] = useState([]);
    const [total, saveTotal] = useState(0);

    // useEffect load component
    useEffect(() => {
        const queryApiClient = async () => {
            const queryClient = await clientAxios.get(`/clients/${id}`);

            dataClient(queryClient.data);
        }

        queryApiClient();

        updateTotal();
    }, [products]);

    const searchProduct = async e => {
        e.preventDefault();

        const resultSearch = await clientAxios.post(`/products/search/${search}`);

        if (resultSearch.data[0]) {
            let resultProduct = resultSearch.data[0];
            resultProduct.product = resultSearch.data[0]._id;
            resultProduct.quantity = 0;

            saveProducts([...products, resultProduct]);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Not found Product !',
                text: 'Not found result product !'
            });
        }

    }

    const readDataSearch = e => {
        saveSearch(e.target.value);
    }

    const subtractProducts = i => {
        // copy array origin
        const allProducts = [...products];

        //validation if <= 0
        if (allProducts[i].quantity === 0) return;

        // decriment
        allProducts[i].quantity--;

        // save quantity state
        saveProducts(allProducts);
    }

    const sumProducts = i => {
        const allProducts = [...products];
        allProducts[i].quantity++;
        saveProducts(allProducts);
    }

    const updateTotal = () => {
        if(products.length === 0){
            saveTotal(0);
            return;
        }

        // loop all products, quantity and prices
        let newTotal = 0;
        products.map(product => newTotal += (product.quantity * product.price));

        saveTotal(newTotal);
    }

    const deleteProductOrder = id =>{
        const allProducts = products.filter(product => product._id !== id);

        saveProducts(allProducts);
    }

    const saveNewOrder = async e =>{
        e.preventDefault();

        const order = {
            client: id,
            products: products,
            total:total
        }

        const result = await clientAxios.post(`/orders`, order);

        if(result.status === 200){
            Swal.fire(
                'Good job!',
                result.data.message,
                'success'
            );

            props.history.push('/orders');

        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        }
    }

    return (
        <Fragment>
            <h2>New Order</h2>

            <div className="ficha-cliente">
                <h3>Data Client</h3>
                <p>Full Name:{client.first_name} {client.last_name}, </p>
                <p>Company: {client.company}</p>
            </div>

            <FormSearchProduct
                searchProduct={searchProduct}
                readDataSearch={readDataSearch}
            />

            <ul className="resumen">
                {products.map((product, index) => (
                    <FormQuantityProduct
                        key={product.product}
                        product={product}
                        sumProducts={sumProducts}
                        subtractProducts={subtractProducts}
                        deleteProductOrder={deleteProductOrder}
                        index={index}
                    />
                ))}
            </ul>
            <p className="total">Total: <span>$ {total}</span></p>

            {
                total > 0 ? (
                    <form
                        onSubmit={saveNewOrder}
                    >
                        <input
                            type="submit"
                            className="btn btn-verde btn-block"
                            value="Save Order"
                        />
                    </form>
                ) : null
            }

        </Fragment>
    );
}

export default withRouter(NewOrder);