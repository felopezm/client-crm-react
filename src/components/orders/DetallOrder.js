import React from 'react';

const DetallOrder = ({order}) => {

    const {client} = order;
    return (
        <li className="pedido">
            <div className="info-pedido">
                <p className="id">ID: </p>
                <p className="nombre">Client: {client.first_name} {client.last_name}</p>

                <div className="articulos-pedido">
                    <p className="productos">Order Items: </p>
                    <ul>
                        {order.products.map(item =>(
                            <li key={order._id+item.product._id}>
                                <p>{ item.product.name }</p>
                                <p>Price: $ { item.product.price }</p>
                                <p>Quantity: { item.quantity }</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <p className="total">Total: { order.total } </p>
            </div>
            <div className="acciones">
                <button type="button" className="btn btn-rojo btn-eliminar">
                    <i className="fas fa-times"></i>
                Delete Order
                </button>
            </div>
        </li>
    );
}

export default DetallOrder;