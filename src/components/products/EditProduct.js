import React, { useState, Fragment, useEffect } from 'react';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import clientAxios from '../../config/axios';
import Spinner from '../layout/Spinner';

const EditProduct = (props) => {

    // get id
    const { id } = props.match.params;

    // product = state, saveProduct = setstate
    const [product, saveProduct] = useState({
        name: '',
        price: 0,
        image: ''
    });

    // file = state, saveFile = setstate
    const [file_, saveFile] = useState('');

    useEffect(() => {
        const queryApi = async () => {
            const productQuery = await clientAxios.get(`/products/${id}`);
            saveProduct(productQuery.data);
        }

        queryApi();
    }, []);

    const readProduct = e => {
        saveProduct({
            //get copy product
            ...product,
            [e.target.name]: e.target.value
        });
    }

    const readFile = e => {
        // get data file (image)
        saveFile(e.target.files[0]);
    }

    const { _id, name, price, image } = product;

    if(!name) return <Spinner />

    const editProductBd = async e =>{
        e.preventDefault();

        // create formData
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('price', product.price);
        formData.append('image', file_);

        try {
            const res = await clientAxios.put(`/products/${id}`, formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            });            

            if (res.status === 200) {
                Swal.fire(
                    'Good job!',
                    'Product Edited !',
                    'success'
                );

                // redirect
                props.history.push('/products');

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!, validate info !',
                });
            }

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!, validate info !',
            });
        }
    }

    return (
        <Fragment>
            <h2> editd Product</h2>

            <form
                onSubmit={editProductBd}
            >
                <legend>Fill all the fields</legend>

                <div className="campo">
                    <label>Name:</label>
                    <input
                        type="text"
                        placeholder="Nombre Producto"
                        name="name"
                        onChange={readProduct}
                        defaultValue={name}
                    />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input
                        type="number"
                        name="price"
                        min="0"
                        placeholder="Price"
                        onChange={readProduct}
                        defaultValue={price}
                    />
                </div>

                <div className="campo">
                    <label>Image:</label>
                    { image ? (
                        <img src={`http://localhost:5000/${image}`} alt="Image Product" width="300" />
                        ) : null
                    }
                    <input
                        type="file"
                        name="image"
                        onChange={readFile}
                    />
                </div>

                <div className="enviar">
                    <input
                        type="submit"
                        className="btn btn-azul"
                        value="Save Changes"
                    />
                </div>
            </form>
        </Fragment>
    );
}

// withRouter = redirect
export default withRouter(EditProduct);