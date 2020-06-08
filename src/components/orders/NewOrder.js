import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clientAxios from '../../config/axios';

import FormSearchProduct from './FormSearchProduct';
import FormQuantityProduct from './FormQuantityProduct';
import Products from '../products/Products';

const NewOrder = (props) => {

    const { id } = props.match.params;
    const [client, dataClient] = useState({});
    const [search, saveSearch] = useState('');
    const [products, saveProduct] = useState([]);

    // useEffect load component
    useEffect(() => {
        const queryApi = async () => {
            const queryClient = await clientAxios.get(`/clients/${id}`);

            dataClient(queryClient.data);
        }

        queryApi();
    }, []);

    const searchProduct = async e => {
        e.preventDefault();

        const resultSearch = await clientAxios.post(`/products/search/${search}`);

        if(resultSearch.data[0]){
            let resultProduct = resultSearch.data[0];
            resultProduct.product = resultSearch.data[0]._id;
            resultProduct.quantity = 0;

            saveProduct([...products,resultProduct]);
        }else{
            Swal.fire({
                icon:'error',
                title: 'Not found Product !',
                text: 'Not found result product !'
            });
        }

    }

    const readDataSearch = e => {
        saveSearch(e.target.value);
    }

    return (
        <Fragment>
            <h2>New Order</h2>

            <div className="ficha-cliente">
                <h3>Data Client</h3>
                <p>{client.first_name}</p>
                <p>{client.last_name}</p>
                <p>{client.company}</p>
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
                    />
                ))}
            </ul>
            <div className="campo">
                <label>Total:</label>
                <input type="number" name="precio" placeholder="Precio" readonly="readonly" />
            </div>
            <div className="enviar">
                <input type="submit" className="btn btn-azul" value="Agregar Pedido" />
            </div>

        </Fragment>
    );
}

export default NewOrder;