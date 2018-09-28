import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {Button, Nav, Navbar} from 'react-bootstrap';
import { withRouter } from 'react-router';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import AuthService from '../services/AuthService';

class Header extends Component {

    onLogin = () => {
        AuthService.loginWithGoogle()
    };

    onLogout = () => {
        AuthService.logout()
      this.props.history.push('/')
    };

    render() {
        const {usuarioLogado} = this.props;
        const logado = usuarioLogado !== undefined;
        return (
            <Navbar bg="primary" variant="dark">
                <NavLink to="/" className="navbar-brand">Twitter</NavLink>
                <Nav className="ml-auto">
                    {
                        logado ? (
                                <div>
                                    <Button variant="light" style={{marginRight: 10}}><NavLink
                                        to="/configuracao">Configurações</NavLink></Button>
                                    <Button variant="light" style={{marginRight: 10}}><NavLink
                                        to={`/perfil/${usuarioLogado.uid}`}>Meu perfil</NavLink></Button>
                                    <Button variant="danger" onClick={this.onLogout}>Sair</Button>
                                </div>
                            ) :
                            (
                                <Button variant="success" onClick={this.onLogin}>Login</Button>
                            )
                    }
                </Nav>
            </Navbar>
        )
    }
}

Header.propTypes = {
    usuarioLogado: PropTypes.object,
};

const mapStateToProps = (state) => {
    return {
        usuarioLogado: state.usuario.usuarioAtual
    }
};

export default connect(mapStateToProps)(withRouter(Header));
