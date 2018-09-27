import React from 'react'
import PropTypes from 'prop-types';
import { Navbar, Nav, Button} from 'react-bootstrap';
import { NavLink} from 'react-router-dom';


const Header = (props) => {

    const {currentUser, onLogin, onLogout} = props;
    const logado = currentUser !== undefined;
    return (
        <Navbar bg="primary" variant="dark">
           <NavLink to="/" className="navbar-brand">Twitter</NavLink>
            <Nav className="ml-auto">
                {
                    logado ? (
                        <div>
                            <Button variant="light" style={{marginRight: 10}}><NavLink to="/configuracao">Configurações</NavLink></Button>
                            <Button variant="light" style={{marginRight: 10}}><NavLink to={`/perfil/${currentUser.uid}`}>Meu perfil</NavLink></Button>
                            <Button variant="danger" onClick={onLogout}>Sair</Button>
                        </div>
                    ) :
                    (
                        <Button variant="success" onClick={onLogin}>Login</Button>
                    )
                }
            </Nav>
        </Navbar>
    )
};

Header.propTypes = {
    currentUser: PropTypes.object,
    onLogin: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired
}


export default Header;
