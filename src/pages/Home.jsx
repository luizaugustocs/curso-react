import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Form, FormControl, InputGroup, Row, Alert } from 'react-bootstrap';
import connect from 'react-redux/es/connect/connect';
import ListaTweet from '../components/ListaTweet';
import Loading from '../components/Loading';
import TweetService from '../services/TweetService';


class Home extends Component {

  static propTypes = {
    usuarioLogado: PropTypes.object
  };

  state = {
    currentPost: '',
    alertVisible: false,
    loading: false,
    tweets: []
  };

  componentDidMount() {
    if (this.props.usuarioLogado !== undefined) {
      this.getUserFeed(this.props.usuarioLogado)
    }
  }

  componentDidUpdate(oldProps) {

    if (this.props.usuarioLogado !== oldProps.usuarioLogado) {
      this.getUserFeed(this.props.usuarioLogado);
    }
  }

  getUserFeed = (user) => {
    this.setState({ loading: true }, () => {
      TweetService.getUserFeed(user)
        .then(tweets => {
          console.log(tweets);
          this.setState({ tweets, loading: false });
        });
    })


  };

  onChange = (event) => {
    this.setState({ currentPost: event.target.value })
  };

  onPost = () => {

    const { usuarioLogado } = this.props;

    if (!usuarioLogado) {
      this.setState({ alertVisible: true });
      return;
    }

    const content = this.state.currentPost;

    this.setState({ currentPost: '', alertVisible: false }, () => {
      TweetService.newTweet(content)
        .then(() => setTimeout(() => this.getUserFeed(usuarioLogado), 1000));
    })
  };

  render() {

    const { currentPost, alertVisible, tweets, loading } = this.state;

    if (loading) {
      return (
        <div className="lds-container">
          <Loading />
        </div>
      );
    }

    return (
      <Container style={{ marginTop: 30 }}>
        <Alert variant="danger" defaultShow={alertVisible}>
          Você deve estar logado para postar alguma coisa.
        </Alert>
        <Form>
          <Row>
            <span className="ml-auto">{currentPost.length} / 140</span>
            <InputGroup>
              <FormControl as="textarea" aria-label="With textarea" maxLength={140}
                           value={currentPost} onChange={this.onChange} />
            </InputGroup>
          </Row>
          <Row style={{ justifyContent: 'flex-end', marginTop: 10 }}>
            <Button variant="primary" onClick={this.onPost}>Postar</Button>
          </Row>

          <Row>
            <ListaTweet tweets={tweets} />
          </Row>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    usuarioLogado: state.usuario.usuarioAtual
  }
};


export default connect(mapStateToProps)(Home);
