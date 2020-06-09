import React, { useEffect, useState, Fragment } from 'react';
import clientAxios from '../../config/axios';

import DetallOrder from './DetallOrder';

const Orders = () => {

    const [orders, saveOrders] = useState([]);

    useEffect(() => {
        const queryApiOrders = async () => {
            const resultOrders = await clientAxios.get('/orders');

            saveOrders(resultOrders.data);
        }

        queryApiOrders();
    }, [])

    return (
        <Fragment>
            <h2>Orders</h2>

            <ul className="listado-pedidos">
                {orders.map(order => (
                    <DetallOrder 
                        key={order._id}
                        order={order}
                    />
                ))}
           </ul>

        </Fragment>
    );
}

export default Orders;