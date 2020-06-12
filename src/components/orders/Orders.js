import React, { useEffect, useState, useContext, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import clientAxios from '../../config/axios';
import DetallOrder from './DetallOrder';
import { CRMContext } from '../../context/CRMContex';

const Orders = (props) => {
    // context
    const [auth, saveAuth] = useContext(CRMContext);

    const [orders, saveOrders] = useState([]);

    const queryApiOrders = async () => {
        try {
            const resultOrders = await clientAxios.get('/orders', {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            saveOrders(resultOrders.data);
        } catch (error) {
            // error token 
            if (error.response.status === 500) {
                props.history.push('/login');
            }
        }
    }

    useEffect(() => {
        if (auth.token !== '') {
            queryApiOrders();
        } else {
            props.history.push('/login');
        }
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

export default withRouter(Orders);