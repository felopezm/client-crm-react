import React, { useState, Fragment } from 'react';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import clientAxios from '../../config/axios';

const NewProduct = (props) => {

    // product = state, saveProduct = setstate
    const [product, saveProduct] = useState({
        name: '',
        price: 0
    });

    // file = state, saveFile = setstate
    const [file_, saveFile] = useState('');

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

    const addProduct = async e => {
        e.preventDefault();

        // create formData
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('price', product.price);
        formData.append('image', file_);

        try {
            const res = await clientAxios.post('/products', formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            });            

            if (res.status === 200) {
                Swal.fire(
                    'Good job!',
                    res.data.message,
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
            <h2>NewProduct</h2>

            <form
                onSubmit={addProduct}
            >
                <legend>Fill all the fields</legend>

                <div className="campo">
                    <label>Name:</label>
                    <input
                        type="text"
                        placeholder="Nombre Producto"
                        name="name"
                        onChange={readProduct}
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
                    />
                </div>

                <div className="campo">
                    <label>Image:</label>
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
                        value="Add Product"
                    />
                </div>
            </form>
        </Fragment>
    );
}

// withRouter = redirect
export default withRouter(NewProduct);