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

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: undefined,
            tweets: []
        }
    }

    componentDidMount() {
        AuthService.onAuthChange((authUser) => {
            if (authUser) {
                UserService.getUserData(authUser.uid)
                    .then((user) => {
                        this.setState({currentUser: user});
                        this.getUserFeed(user)

                    })
            }
            else {
                this.setState({currentUser: undefined})
            }
        })

    }

    getUserFeed = (user) => {
        TweetService.getUserFeed(user)
            .then(tweets => {
                this.setState({tweets});
            });
    };

    onLogin = () => {
        AuthService.loginWithGoogle()
    };

    onLogout = () => {
        AuthService.logout();
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
                <Header currentUser={currentUser} onLogin={this.onLogin}
                        onLogout={this.onLogout}/>
                <Switch>
                    <Route path="/" exact
                           render={props => <Home {...props} tweets={tweets} currentUser={currentUser}
                                                  onTweet={this.onPostTweet}
                           />}
                    /><Route path="/perfil/:id" exact
                             render={props => <Perfil {...props} currentUser={currentUser}
                                                      onFollow={this.onFollow}
                             />}
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
