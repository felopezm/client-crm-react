import React, { useEffect, useState, Fragment } from 'react';
import clientAxios from '../../config/axios';
import Client from './Client';
import { Link } from 'react-router-dom';

const Clients = () => {

    // job state 
    const [clients, saveClients] = useState([]);

    const queryApi = async () => {
        const clientsData = await clientAxios.get('/clients');
       
        saveClients(clientsData.data);
    }

    useEffect(() => {
        queryApi();
    }, [clients])

    return (
        <Fragment>
            <h2>Clients</h2>
            <Link to={"/clients/new"} className="btn btn-verde nvo-cliente">
                 <i className="fas fa-plus-circle"></i>
                New Client
            </Link>
            <ul className='listado-clientes'>
                {clients.map(client =>(
                    <Client
                        key={client._id}
                        client={client}
                    />
                ))}
            </ul>
        </Fragment>
        
    );
}

export default Clients;