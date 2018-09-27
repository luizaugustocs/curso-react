import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Container, Form, FormControl, InputGroup, Row, Alert} from 'react-bootstrap';
import ListaTweet from '../components/ListaTweet';


class Home extends Component {

    static propTypes = {
        tweets: PropTypes.array,
        onTweet: PropTypes.func.isRequired
    };

    state = {
        currentPost: '',
        alertVisible: false
    };

    onChange = (event) => {
        this.setState({currentPost: event.target.value})
    };

    onPost = () => {

        const {currentUser} = this.props;

        if (!currentUser) {
            this.setState({alertVisible: true})
            return;
        }

        const newTweet = {
            content: this.state.currentPost,
            uid: new Date(Date.now()).toISOString(),
            author: currentUser.uid,
            timestamp: Date.now(),
            authorName: currentUser.displayName,
            authorUserName: currentUser.userName,
            authorPhotoURL: currentUser.photoURL
        };

        this.setState({currentPost: '', alertVisible: false}, () => {
            this.props.onTweet(newTweet);
        })
    };

    render() {

        const {currentPost, alertVisible} = this.state;
        const {tweets} = this.props;

        return (
            <Container style={{marginTop: 30}}>
                <Alert variant="danger" show={alertVisible}>
                    Você deve estar logado para postar alguma coisa.
                </Alert>
                <Form>
                    <Row>
                        <span className="ml-auto">{currentPost.length} / 140</span>
                        <InputGroup>
                            <FormControl as="textarea" aria-label="With textarea" maxLength={140}
                                         value={currentPost} onChange={this.onChange}/>
                        </InputGroup>
                    </Row>
                    <Row style={{justifyContent: 'flex-end', marginTop: 10}}>
                        <Button variant="primary" onClick={this.onPost}>Postar</Button>
                    </Row>

                    <Row>
                        <ListaTweet tweets={tweets}/>
                    </Row>
                </Form>
            </Container>
        )
    }
}


export default Home;
