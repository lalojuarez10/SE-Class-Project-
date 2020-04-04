import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';       //includes bootstrap css
import './App.css';
import AppNavbar from './components/AppNavbar';      //include the appnavbar we created
import ShoppingList from './components/ShoppingList'; //include the shoppin list we created
import { Provider } from 'react-redux';               // binds react to redux
import store from './store';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';
import { loadUser } from './actions/authActions';
import ShoppingCartModal from './components/ShoppingCartModal';
import ProductsList from './components/ProductsList';
import CheckoutModal from './components/CheckoutModal';
import { loadGuest, createGuest } from './actions/guestActions';

class App extends Component {
  componentDidMount() {
    //store.dispatch(createGuest());
    store.dispatch(loadUser());                  // loads user continously
    store.dispatch(loadGuest());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <script src="http://localhost:6000"></script>
          <AppNavbar />
          <Container>
            <ShoppingCartModal></ShoppingCartModal>

          </Container>
          <Container>
            <ProductsList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
