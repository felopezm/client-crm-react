import React from 'react';

const Client = ({client}) => {

    const {_id,first_name,last_name,company,email,telephone} = client;
    return (
        <li className="cliente">
            <div className="info-cliente">
                <p className="nombre">{first_name} {last_name}</p>
                <p className="empresa">{company}</p>
                <p>{email}</p>
                <p>Tel: {telephone}</p>
            </div>
            <div className="acciones">
                <a href="#" className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                Edit Client
            </a>
                <button type="button" className="btn btn-rojo btn-eliminar">
                    <i className="fas fa-times"></i>
                Delete Client
            </button>
            </div>
        </li>
    );
}

export default Client;