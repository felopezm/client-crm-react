import React, {Fragment} from 'react';

const NewClient = () => {
    return ( 
        <Fragment>
            <h2>New Client</h2>
            
            <form>
                <legend>Fill all the fields</legend>

                <div className="campo">
                    <label>First Name:</label>
                    <input type="text" placeholder="First Name Client" name="first_name" />
                </div>

                <div className="campo">
                    <label>Last Name:</label>
                    <input type="text" placeholder="Last Name Client" name="last_name" />
                </div>
            
                <div className="campo">
                    <label>Company:</label>
                    <input type="text" placeholder="Company Client" name="company" />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" placeholder="Email Client" name="email" />
                </div>

                <div className="campo">
                    <label>Telephone:</label>
                    <input type="text" placeholder="Telephone Client" name="telephone"/>
                </div>

                <div className="enviar">
                        <input type="submit" className="btn btn-azul" value="Add Client" />
                </div>

            </form>
        </Fragment>
     );
}
 
export default NewClient;