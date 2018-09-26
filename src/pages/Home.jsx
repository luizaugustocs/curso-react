import React, {Component} from 'react';
import {Button, Container, Form, FormControl, InputGroup, Row} from 'react-bootstrap';
import ListaTweet from '../components/ListaTweet';


class Home extends Component {

    state = {
        currentPost: '',
        tweets: []
    };

    onChange = (event) => {
        this.setState({currentPost: event.target.value})
    };

    onPost = () => {

        const {currentUser} = this.props;

        if (!currentUser) {
            return;
        }

        this.setState(state => {
            const newTweet = {
                content: state.currentPost,
                uid: new Date(Date.now()).toISOString(),
                author: currentUser.uid,
                timestamp: Date.now(),
                authorName: currentUser.displayName,
                authorUserName: currentUser.userName
            };

            return {
                currentPost: '',
                tweets: [newTweet, ...state.tweets]
            };
        })
    };

    onNavigate = (tweet) => {
        this.props.history.push(`/perfis/${tweet.author}`)
    }


    render() {

        const {currentPost, tweets} = this.state;

        return (
            <Container style={{marginTop: 30}}>
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
                        <ListaTweet tweets={tweets} onNavigate={this.onNavigate}/>
                    </Row>
                </Form>
            </Container>
        )
    }
}


export default Home;