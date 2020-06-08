import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clientAxios from '../../config/axios';

const Client = ({ client }) => {

    const { _id, first_name, last_name, company, email, telephone } = client;

    const deleteClient = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                clientAxios.delete(`/clients/${id}`)
                    .then(res => {
                        if (res.data.code) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Something went wrong!',
                            });
                        } else {
                            Swal.fire(
                                'Deleted!',
                                 res.data.message,
                                'success'
                            )
                        }
                    });
            }
        })
    }

    return (
        <li className="cliente">
            <div className="info-cliente">
                <p className="nombre">{first_name} {last_name}</p>
                <p className="empresa">{company}</p>
                <p>{email}</p>
                <p>Tel: {telephone}</p>
            </div>
            <div className="acciones">
                <Link to={`/clients/edit/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Edit Client
                </Link>
                <Link to={`/orders/new/${_id}`} className="btn btn-amarillo">
                    <i className="fas fa-plus"></i>
                    New Order
                </Link>
                <button type="button"
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => deleteClient(_id)}
                >
                    <i className="fas fa-times">
                    </i>
                Delete Client
                </button>
            </div>
        </li>
    );
}

export default Client;