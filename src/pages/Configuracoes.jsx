import React from 'react';
import {Button, Container, Form} from 'react-bootstrap';


class Configuracoes extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            displayName: '',
            userName: '',
            photoURL: ''
        }
    }

    componentDidMount() {
        this.updateUserInState(this.props.currentUser)
    }

    componentDidUpdate(oldProps) {

        if (oldProps.currentUser !== this.props.currentUser) {
            this.updateUserInState(this.props.currentUser)
        }
    }

    updateUserInState = (user) => {
        this.setState({...user})
    };

    onChange = (event) => {
        const {value, name} = event.target;
        this.setState({
            [name]: value
        });
    };

    onSave = () => {
        this.props.onSave({...this.state}).then(() => this.props.history.goBack())
    };

    render() {
        const {displayName, userName, photoURL} = this.state;

        return (
            <Container >
                <Form>
                    <Form.Group>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control name="displayName" value={displayName} onChange={this.onChange} size="sm"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Nome de Usuário</Form.Label>
                        <Form.Control name="userName" value={userName} onChange={this.onChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Url da foto</Form.Label>
                        <Form.Control name="photoURL" value={photoURL} onChange={this.onChange}/>
                    </Form.Group>
                    <Button variant="success" onClick={this.onSave}>Salvar</Button>
                </Form>
            </Container>
        )
    }
}


export default Configuracoes;
