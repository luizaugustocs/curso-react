import firebase from 'firebase';
import AuthService from './AuthService';

/** @type {import('../../types/index').TweetService} */
const TweetService = {
    newTweet: (tweetContent)=> {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) {
            return Promise.reject();
        }
        const parsedTweet = {
            content: tweetContent,
            author: currentUser.uid,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        };

        return firebase.firestore().collection(`/tweets`).add(parsedTweet)
    },
    getUserTweets: (user, lastTweet) => {

        const query = firebase.firestore().collection(`/tweets`)
            .where('author', '==', user.uid)
            .orderBy('timestamp', 'desc')
            .limit(5);

        return (lastTweet ? query.startAfter(lastTweet) : query)
            .get()
            .then(snapshot => snapshot.docs)
            .then(tweets => tweets.filter(tweet => tweet.exists))
    },
    getUserFeed: (user, lastTweet)=> {
        const query = firebase.firestore().collection(`/users/${user.uid}/feed/`)
            .orderBy('timestamp', 'desc')
            .limit(5);

        return (lastTweet ? query.startAfter(lastTweet) : query)
            .get()
            .then(snapshot => snapshot.docs)
            .then(tweets => Promise.all(tweets.map(tweet => firebase.firestore().doc(`/tweets/${tweet.id}`).get())))
            .then(tweets => tweets.filter(tweet => tweet.exists))
    }
}


export default TweetService;
