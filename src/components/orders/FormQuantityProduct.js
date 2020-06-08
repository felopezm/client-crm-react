import React from 'react';

const FormQuantityProduct = ({product}) => {

    const {name,price,quantity} = product;

    return (
        <li>
            <div className="texto-producto">
            <p className="nombre">{name}</p>
            <p className="precio">$ {price}</p>
            </div>
            <div className="acciones">
                <div className="contenedor-cantidad">
                    <i className="fas fa-minus"></i>
                    <p>{quantity}</p>
                    <i className="fas fa-plus"></i>
                </div>
                <button type="button" className="btn btn-rojo">
                    <i className="fas fa-minus-circle"></i>
                        Delete Product
                </button>
            </div>
        </li>
    );
}

export default FormQuantityProduct;