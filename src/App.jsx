import React, {Component} from 'react';

import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Perfil from './pages/Perfil';
import Configuracoes from './pages/Configuracoes'
import NotFound from './pages/NotFound';
import {Route, Switch, withRouter} from 'react-router-dom';
import AuthService from './services/AuthService';
import TweetService from './services/TweetService';
import UserService from './services/UserService';
import createStore from './createStore';
import {Provider} from 'react-redux';

import {usuarioLogin, usuarioLogout} from './state/actions/UsuarioActions';

const store = createStore({});


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tweets: []
        }
    }

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

    getUserFeed = (user) => {
        TweetService.getUserFeed(user)
            .then(tweets => {
                console.log(tweets);
                this.setState({tweets});
            });
    };

    onPostTweet = (tweet) => {
        TweetService.newTweet(tweet)
            .then(() => setTimeout(() => this.getUserFeed(this.state.currentUser), 1000));
    };

    onFollow = (user) => {
        UserService.followUser(user)
            .then(() => console.log('Follow'))
    }

    onSaveConfiguracao = (updatedUser) => {
        return UserService.updateUserData(updatedUser)
            .then(() => this.setState({currentUser: {...updatedUser}}))
    };

    render() {
        const {currentUser, tweets} = this.state;
        return (
            <div>
                <Provider store={store}>
                    <React.Fragment>
                        <Header/>
                        <Switch>
                            <Route path="/" exact
                                   render={props => <Home {...props} tweets={tweets} currentUser={currentUser}
                                                          onTweet={this.onPostTweet}
                                   />}
                            />
                            <Route path="/perfil/:id" exact
                                   render={props => <Perfil {...props} currentUser={currentUser}
                                                            onFollow={this.onFollow}
                                   />}
                            />
                            <Route path="/configuracao" exact component={Configuracoes}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </React.Fragment>
                </Provider>
            </div>
        );
    }
}

export default withRouter(App);
