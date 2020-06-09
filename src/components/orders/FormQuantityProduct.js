import React from 'react';

const FormQuantityProduct = (props) => {

    const {product,sumProducts,subtractProducts,deleteProductOrder,index} = props;

    const {_id,name,price,quantity} = product;

    return (
        <li>
            <div className="texto-producto">
            <p className="nombre">{name}</p>
            <p className="precio">$ {price}</p>
            </div>
            <div className="acciones">
                <div className="contenedor-cantidad">
                    <i 
                        className="fas fa-minus"
                        onClick={() => subtractProducts(index)}
                    ></i>
                    <p>{quantity}</p>
                    <i 
                        className="fas fa-plus"
                        onClick={() => sumProducts(index)}
                    ></i>
                </div>
                <button 
                    type="button" 
                    className="btn btn-rojo"
                    onClick={() => deleteProductOrder(_id)}  
                >
                    <i className="fas fa-minus-circle"></i>
                        Delete Product
                </button>
            </div>
        </li>
    );
}

export default FormQuantityProduct;