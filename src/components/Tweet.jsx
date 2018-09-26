import React from 'react';
import PropTypes from 'prop-types';
import {Col, Row, ListGroup} from 'react-bootstrap';
import {Link} from 'react-router-dom';


const formatter = new Intl.DateTimeFormat('pt-BR',{
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
})
const Tweet = props => {
    const {tweet} = props;
    const date = formatter.format(new Date(tweet.timestamp))
    return (
        <ListGroup.Item key={tweet.uid}>
            <Row style={{justifyContent: 'space-between'}}>
                <Col md={3}>
                    <h5>{tweet.authorName}</h5>
                </Col>
                <Col md={3}>
                    <Link to={`/perfis/${tweet.author}`}>{`@${tweet.authorUserName}`}</Link>
                </Col>
                <Col md={3}>
                    <h5>{date}</h5>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <h3>{tweet.content}</h3>
                </Col>
            </Row>
        </ListGroup.Item>

    );
};

Tweet.propTypes = {

};

export default Tweet;