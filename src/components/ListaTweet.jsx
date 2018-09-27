import React from 'react';
import PropTypes from 'prop-types';
import {ListGroup} from 'react-bootstrap';
import Tweet from './Tweet';

const ListaTweet = props => {
    return (
        <ListGroup style={{flexBasis: '100%', marginTop: 10}} >
            {props.tweets.map(tweet => (
                <Tweet key={tweet.data().uid} tweet={tweet.data()}/>
            ))}
        </ListGroup>
    );
};

ListaTweet.propTypes = {
    tweets: PropTypes.array
};

export default ListaTweet;
