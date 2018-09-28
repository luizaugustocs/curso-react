import React, { Component } from 'react';

import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Perfil from './pages/Perfil';
import Configuracoes from './pages/Configuracoes'
import NotFound from './pages/NotFound';
import { Route, Switch, withRouter } from 'react-router-dom';
import AuthService from './services/AuthService';
import createStore from './createStore';
import { Provider } from 'react-redux';

import { usuarioLogin, usuarioLogout } from './state/actions/UsuarioActions';

const store = createStore({});


class App extends Component {

  componentDidMount() {
    AuthService.onAuthChange((authUser) => {
      if (authUser) {
        store.dispatch(usuarioLogin(authUser))
      }
      else {
        store.dispatch(usuarioLogout())
      }
    });

  }

  render() {
    return (
      <div>
        <Provider store={store}>
          <React.Fragment>
            <Header />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/perfil/:id" exact component={Perfil} />
              <Route path="/configuracao" exact component={Configuracoes} />
              <Route component={NotFound} />
            </Switch>
          </React.Fragment>
        </Provider>
      </div>
    );
  }
}

export default withRouter(App);
