import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { CRMContext } from '../../context/CRMContex';

const Header = (props) => {

    const [auth, saveAuth] = useContext(CRMContext);

    const signOut = () => {
        saveAuth({
            token: '',
            auth: false
        });

        localStorage.setItem('token', '');
        props.history.push('/login');
    }

    return (
        <header className="barra">
            <div className="contenedor">
                <div className="contenido-barra">
                    <h1>CRM - Administrador de Clientes</h1>

                    {auth.auth ? (
                        <button
                            type="button"
                            className="btn btn-rojo"
                            onClick={signOut}
                        >
                            <i className="far fa-times-circle"></i>

                       Sign Out
                        </button>
                    ) : null}
                </div>
            </div>
        </header>
    )
}

export default withRouter(Header);