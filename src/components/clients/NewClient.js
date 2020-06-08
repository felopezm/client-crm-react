import React, { Fragment, useState } from 'react';
import Swal from 'sweetalert2';
import { withRouter} from 'react-router-dom';
import clientAxios from '../../config/axios';

const NewClient = ({history}) => {
    // client = state, saveClient = serstate
    const [client, saveClient] = useState({
        first_name: '',
        last_name: '',
        company: '',
        email: '',
        telephone: ''
    });

    const updateState = e => {
        // save data client nnChange input
        saveClient({
            // get copy state
            ...client,
            [e.target.name]: e.target.value
        });
    }

    const validateClient = () => {
        const { first_name, last_name, company, email, telephone } = client;

        let validate = !first_name.length || !last_name.length || !company.length || !email.length || !telephone.length;

        return validate;
    }

    const addClient = e => {
        e.preventDefault();

        clientAxios.post('/clients', client)
            .then(res => {
                if (res.data.code) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!, validate email client',
                    });
                } else {
                    Swal.fire(
                        'Good job!',
                        res.data.message,
                        'success'
                    );
                    
                    // redirect
                    history.push('/');
                }
            });
    }

    return (
        <Fragment>
            <h2>New Client</h2>

            <form
                onSubmit={addClient}
            >
                <legend>Fill all the fields</legend>

                <div className="campo">
                    <label>First Name:</label>
                    <input type="text"
                        placeholder="First Name Client"
                        name="first_name"
                        onChange={updateState}
                    />
                </div>

                <div className="campo">
                    <label>Last Name:</label>
                    <input type="text"
                        placeholder="Last Name Client"
                        name="last_name"
                        onChange={updateState}
                    />
                </div>

                <div className="campo">
                    <label>Company:</label>
                    <input type="text"
                        placeholder="Company Client"
                        name="company"
                        onChange={updateState}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email"
                        placeholder="Email Client"
                        name="email"
                        onChange={updateState}
                    />
                </div>

                <div className="campo">
                    <label>Telephone:</label>
                    <input type="text"
                        placeholder="Telephone Client"
                        name="telephone"
                        onChange={updateState}
                    />
                </div>

                <div className="enviar">
                    <input type="submit"
                        className="btn btn-azul"
                        value="Add Client"
                        disabled={validateClient()}
                    />
                </div>

            </form>
        </Fragment>
    );
}

// withRouter = redirect
export default withRouter(NewClient);