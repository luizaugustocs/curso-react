const functions = require('firebase-functions');
const admin = require('firebase-admin');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp(functions.config().firebase);

exports.onNewUser = functions.auth.user().onCreate((user) => {

    const parsedUser = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        userName: user.email.split('@')[0]
    };

    return admin.firestore().doc(`/users/${user.uid}`)
        .set(parsedUser);
});

exports.onNewTweet = functions.firestore.document('/tweets/{tweetId}')
    .onCreate((snapshot, context) => {

        const newTweet = snapshot.data();
        const {tweetId} = context.params;
        const {author: authorId} = newTweet;

        const updateTweetPromise = admin.firestore().doc(`/users/${authorId}`).get()
            .then(author =>
                snapshot.ref.set({
                    authorName: author.data().displayName || '',
                    authorUserName: author.data().userName || '',
                    authorPhotoURL: author.data().photoURL || '',
                    uid: snapshot.id
                }, {merge: true}));

        const authorTweetPromise = admin.firestore().doc(`/users/${authorId}/tweets/${tweetId}`)
            .set({timestamp: admin.firestore.FieldValue.serverTimestamp()});

        const followersPromise = admin.firestore().collection(`/users/${authorId}/followers`)
            .get()
            .then(followers =>
                Promise.all(
                    followers.docs
                        .map(follower => admin.firestore()
                            .doc(`/users/${follower.id}/feed/${snapshot.id}`)
                            .set({timestamp: admin.firestore.FieldValue.serverTimestamp(), author: newTweet.author})
                        )
                )
            );

        return Promise.all([updateTweetPromise, authorTweetPromise, followersPromise])

    });