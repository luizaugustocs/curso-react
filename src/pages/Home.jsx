import React, {Component} from 'react';
import {Button, Container, Form, FormControl, InputGroup, Row} from 'react-bootstrap';
import ListaTweet from '../components/ListaTweet';


class Home extends Component {

    state = {
        currentPost: ''
    };

    onChange = (event) => {
        this.setState({currentPost: event.target.value})
    };

    onPost = () => {

        const {currentUser} = this.props;

        if (!currentUser) {
            return;
        }

      const newTweet = {
        content: this.state.currentPost,
        uid: new Date(Date.now()).toISOString(),
        author: currentUser.uid,
        timestamp: Date.now(),
        authorName: currentUser.displayName,
        authorUserName: currentUser.userName
      };

        this.setState({currentPost: ''}, () => {
            this.props.onTweet(newTweet);
        })
    };

    onNavigate = (tweet) => {
        this.props.history.push(`/perfis/${tweet.author}`)
    }


    render() {

        const {currentPost} = this.state;
        const {tweets} = this.props;

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
