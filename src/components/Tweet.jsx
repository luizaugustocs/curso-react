import React from 'react';
import PropTypes from 'prop-types';
import {Col, Row, ListGroup} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';


const formatter = new Intl.DateTimeFormat('pt-BR',{
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
});

const Tweet = props => {
    const {tweet} = props;
    const date = formatter.format(tweet.timestamp.toDate());
    return (
        <ListGroup.Item key={tweet.uid}  style={{display: 'flex', justifyContent: 'space-between'}}>
            <div className="container-fluid" style={{marginRight: 10}}>
            <Row style={{justifyContent: 'space-between'}}>
                    <h5>{tweet.authorName}</h5>
                    <NavLink to={`/perfil/${tweet.author}`}>{`@${tweet.authorUserName}`}</NavLink>
                    <h5>{date}</h5>
            </Row>
            <Row>
                <Col md={12}>
                    <h3>{tweet.content}</h3>
                </Col>
            </Row>
            </div>
            <div>
                <img className="profile-photo" src={tweet.authorPhotoURL} alt="Foto do usuario que escreveu o tweet" />
            </div>
        </ListGroup.Item>

    );
};

Tweet.propTypes = {
    tweet: PropTypes.object.isRequired
};

export default Tweet;
