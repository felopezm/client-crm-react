import React from 'react';

const FormSearchProduct = (props) => {
    return ( 
        <form 
            onSubmit={props.searchProduct}
        >
            <legend>Search Product and add quantity</legend>

            <div className="campo">
                <label>Products:</label>
                <input 
                    type="text" 
                    placeholder="Name Products" 
                    name="productos" 
                    onChange={props.readDataSearch}
                />
            </div>

            <input 
                type="submit"
                className="btn btn-azul btn-block"
                value="Search Product"
            />
        </form>
     );
}
 
export default FormSearchProduct;