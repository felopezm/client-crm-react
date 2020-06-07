import React, { Fragment, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { withRouter} from 'react-router-dom';
import clientAxios from '../../config/axios';

const EditClient = (props) => {

    const { id } = props.match.params;

    // client = state
    const [client, dataClient] = useState({
        first_name: '',
        last_name: '',
        company: '',
        email: '',
        telephone: ''
    });

    // query api
    const queryApi = async () =>{
        const queryClient = await clientAxios.get(`/clients/${id}`);

        dataClient(queryClient.data);
        
    }
    // useEffect load component
    useEffect(() => {
        queryApi();
    }, [])

    const updateState = e => {
        // save data client nnChange input
        dataClient({
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

    const updateClient = e =>{
        e.preventDefault();

        clientAxios.put(`/clients/${id}`,client)
            .then(res => {
                if (res.data.code) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    });
                } else {
                    Swal.fire(
                        'Good job!',
                        'Updated Client !',
                        'success'
                    );
                    
                    // redirect
                    props.history.push('/');
                }
            })
    }

    return (
        <Fragment>
            <h2>Edit Client</h2>

            <form
                onSubmit={updateClient}
            >
                <legend>Fill all the fields</legend>

                <div className="campo">
                    <label>First Name:</label>
                    <input type="text"
                        placeholder="First Name Client"
                        name="first_name"
                        onChange={updateState}
                        value={client.first_name}
                    />
                </div>

                <div className="campo">
                    <label>Last Name:</label>
                    <input type="text"
                        placeholder="Last Name Client"
                        name="last_name"
                        onChange={updateState}
                        value={client.last_name}
                    />
                </div>

                <div className="campo">
                    <label>Company:</label>
                    <input type="text"
                        placeholder="Company Client"
                        name="company"
                        onChange={updateState}
                        value={client.company}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email"
                        placeholder="Email Client"
                        name="email"
                        onChange={updateState}
                        value={client.email}
                    />
                </div>

                <div className="campo">
                    <label>Telephone:</label>
                    <input type="text"
                        placeholder="Telephone Client"
                        name="telephone"
                        onChange={updateState}
                        value={client.telephone}
                    />
                </div>

                <div className="enviar">
                    <input type="submit"
                        className="btn btn-azul"
                        value="Save Changes"
                        disabled={validateClient()}
                    />
                </div>

            </form>
        </Fragment>
    );
}

// withRouter = redirect
export default withRouter(EditClient);