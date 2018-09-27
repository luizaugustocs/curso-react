import React, {Component} from 'react';
import {Button, Container, Row} from 'react-bootstrap';
import ListaTweet from '../components/ListaTweet';

class Perfil extends Component {

    state = {
        tweets: [{
            content: 'Teste 3',
            uid: '3',
            author: '1234',
            timestamp: Date.now(),
            authorName: 'Luiz Augusto',
            authorUserName: 'luizaugustocs',
            authorPhotoURL: 'https://www.bookmydesign.com/auth-image/medium/blank-user.png'
        }, {
            content: 'Teste 2',
            uid: '2',
            author: '1234',
            timestamp: Date.now() - 500000,
            authorName: 'Luiz Augusto',
            authorUserName: 'luizaugustocs',
            authorPhotoURL: 'https://www.bookmydesign.com/auth-image/medium/blank-user.png'
        }, {
            content: 'Teste 1',
            uid: '1',
            author: '1234',
            timestamp: Date.now() - 1000000,
            authorName: 'Luiz Augusto',
            authorUserName: 'luizaugustocs',
            authorPhotoURL: 'https://www.bookmydesign.com/auth-image/medium/blank-user.png'
        }],
        user: {
            uid: '1234',
            photoURL: 'https://www.bookmydesign.com/auth-image/medium/blank-user.png',
            userName: 'luizaugustocs',
            displayName: 'Luiz Augusto',
            email: 'luizaugustocsouza@gmail.com'
        }
    };

    render() {
        const {user, tweets} = this.state;
        return (
            <Container>
                <Row className="profile-section">
                    <img src={user.photoURL} alt="foto do perfil do usuário"
                         className="profile-photo"/>
                    <div className="profile-data">
                        <span>{user.displayName}</span>
                        <span>{`@${user.userName}`}</span>
                    </div>
                    <div className="ml-auto">
                        <Button>Seguir</Button>
                    </div>
                </Row>
                <Row>
                    <ListaTweet tweets={tweets}/>
                </Row>
            </Container>
        );
    }
}

export default Perfil;
