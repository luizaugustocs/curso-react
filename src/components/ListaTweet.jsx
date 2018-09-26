import React from 'react';
import PropTypes from 'prop-types';
import {ListGroup} from 'react-bootstrap';
import Tweet from './Tweet';

const ListaTweet = props => {
    return (
        <ListGroup style={{flexBasis: '100%'}} >
            {props.tweets.map(tweet => (
                <Tweet key={tweet.id} tweet={tweet}/>
            ))}
        </ListGroup>
    );
};

ListaTweet.propTypes = {
    tweets: PropTypes.array,
    onNavigate: PropTypes.func.isRequired

};

export default ListaTweet;