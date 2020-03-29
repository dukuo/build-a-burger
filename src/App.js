import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom'

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from'./containers/BurgerBuilder/BurgerBuilder'
import './App.css';
import OrderSummary from './components/Burger/OrderSummary/OrderSummary';
import CheckoutForm from './containers/Checkout/CheckoutForm';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/" exact render={() => <BurgerBuilder />} />
          <Route path="/builder/:id" exact render={() => <BurgerBuilder />} />
          <Route path="/order/:id" exact render={() => <OrderSummary />} />
          <Route path="/checkout/:id" exact render={() => <CheckoutForm />} />
        </Switch>
      </Layout>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
