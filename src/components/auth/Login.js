import React, {useState, useContext} from 'react';
import Swal from 'sweetalert2';
import { withRouter} from 'react-router-dom';
import clientAxios from '../../config/axios';
import { CRMContext } from '../../context/CRMContex';

const Login = (props) => {

    // context
    const [auth, saveAuth] = useContext(CRMContext);

    const [ credentials, saveCredential] = useState({});

    const login = async e =>{
        e.preventDefault();

        try {
            const response = await clientAxios.post('/login', credentials);

            const { token } = response.data;
            localStorage.setItem('token', token);

            saveAuth({
                token,
                auth: true
            });

            Swal.fire({
                icon: 'success',
                title: 'Login Success',
                text: 'Welcome !'
            });

            props.history.push('/');

        } catch (error) {
            console.log(error);
            
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message
            });
        }
    }

    const readData = e =>{
        saveCredential({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div className="login">
            <h2>Login</h2>

            <div className="contenedor-formulario">
                <form
                 onSubmit={login}
                >
                    <div className="campo">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email ..."
                            required
                            onChange={readData}
                        />
                    </div>
                    <div className="campo">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password ..."
                            required
                            onChange={readData}
                        />
                    </div>
                    <input
                        type="submit"
                        value="Login"
                        className="btn btn-verde btn-block"
                    />
                </form>
            </div>
        </div>
    );
}

export default withRouter(Login);