import React, { useEffect, useState, Fragment, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';

import clientAxios from '../../config/axios';
import Client from './Client';
import Spinner from '../layout/Spinner';
import { CRMContext } from '../../context/CRMContex';

const Clients = (props) => {
    // context
    const [auth, saveAuth] = useContext(CRMContext);

    // job state 
    const [clients, saveClients] = useState([]);

    const queryApi = async () => {
        try {
            const clientsData = await clientAxios.get('/clients', {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
    
            saveClients(clientsData.data);
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

    if(!auth.auth)
        props.history.push('/login');

    if (!clients.length) return <Spinner />

    return (
        <Fragment>
            <h2>Clients</h2>
            <Link to={"/clients/new"} className="btn btn-verde nvo-cliente">
                <i className="fas fa-plus-circle"></i>
                New Client
            </Link>
            <ul className='listado-clientes'>
                {clients.map(client => (
                    <Client
                        key={client._id}
                        client={client}
                    />
                ))}
            </ul>
        </Fragment>

    );
}

export default withRouter(Clients);