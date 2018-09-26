import React, {Component} from 'react';

import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Configuracoes from './pages/Configuracoes'
import NotFound from './pages/NotFound';
import {Route, Switch, withRouter} from 'react-router-dom';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: undefined
        }
    }

    onLogin = () => {
        this.setState({
            currentUser: {
                uid: '1234',
                userName: 'luizaugustocs',
                displayName: 'Luiz Augusto',
                photoURL: '',
                email: 'luizaugustocsouza@gmail.com'
            }
        });
    };

    onLogout = () => {
        this.setState({currentUser: undefined}, () => {
            this.props.history.push('/')
        });
    };

    onSaveConfiguracao = (updatedUser) => {
        return new Promise(resolve => {
            this.setState({
                currentUser: {...updatedUser}
            }, () => {
                resolve()
            })

        })
    };

    render() {
        const {currentUser} = this.state;
        return (
            <div>
                <Header logado={currentUser !== undefined} onLogin={this.onLogin} onLogout={this.onLogout}/>
                <Switch>
                    <Route path="/" exact render={props => <Home {...props} currentUser={currentUser}/>}
                    />
                    <Route path="/configuracao" exact
                           render={props => <Configuracoes {...props} currentUser={currentUser}
                                                           onSave={this.onSaveConfiguracao}/>}
                    />
                    <Route component={NotFound}/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);
