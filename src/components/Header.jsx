import React from 'react'
import { Navbar, Nav, Button} from 'react-bootstrap';
import { NavLink} from 'react-router-dom';


const Header = (props) => {

    const {logado, onLogin, onLogout} = props;

    return (
        <Navbar bg="primary" variant="dark">
           <NavLink to="/" className="navbar-brand">Twitter</NavLink>
            <Nav className="ml-auto">
                {
                    logado ? (
                        <div>
                            <Button variant="light" style={{marginRight: 10}}><NavLink to="/configuracao">Configurações</NavLink></Button>
                            <Button variant="light" style={{marginRight: 10}}><NavLink to="/perfil">Meu perfil</NavLink></Button>
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
}


export default Header;