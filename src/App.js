import React, { Fragment } from 'react';

// Routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/** layout */
import Header from './components/layout/Header';
import Navegation from './components/layout/Navegation';

/** components */
import Clients from './components/clients/Clients';
import NewClient from './components/clients/NewClient';
import EditClient from './components/clients/EditClient';

import Products from './components/products/Products';
import NewProduct from './components/products/NewProduct';
import EditProduct from './components/products/EditProduct';


import Orders from './components/orders/Orders';

function App() {
  return (
    <Router>
      <Fragment>
        <Header />
        <div className="grid contenedor contenido-principal">
          <Navegation />

          <main className="caja-contenido col-9">
            <Switch>
              <Route exact path="/" component={Clients} />
              <Route exact path="/clients/new" component={NewClient} />
              <Route exact path="/clients/edit/:id" component={EditClient} />

              <Route exact path="/products" component={Products} />
              <Route exact path="/products/new" component={NewProduct} />
              <Route exact path="/products/edit/:id" component={EditProduct} />


              <Route exact path="/orders" component={Orders} />               
            </Switch>
          </main>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;