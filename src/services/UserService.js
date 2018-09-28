import firebase from 'firebase';
import AuthService from './AuthService';

/** @type {import('../../types/index').UserService} */
const UserService = {
    followUser: (userToFollow) => {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser)
            return Promise.reject();
        return firebase.firestore().doc(`/users/${userToFollow.uid}/followers/${currentUser.uid}`)
            .set({timestamp: firebase.firestore.FieldValue.serverTimestamp()})
    },
    updateUserData: (userData) => {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser)
            return Promise.reject();
        return firebase.firestore().doc(`/users/${currentUser.uid}`).set(userData, {merge: true})
    },
    getUserData: (userId) =>
        firebase.firestore().doc(`/users/${userId}`).get()
            .then(user => user.data()),
    getAllUsers: () =>
      firebase.firestore().collection('/users')
        .get()
        .then(users => users.docs.map(user => user.data())),
    searchUser: (searchText) =>
        firebase.firestore().collection('/users')
            .get()
            .then(users =>
                users.docs
                    .map(user => user.data())
                    .filter(user => {
                        return (user.userName && user.userName.includes(searchText)) || (user.displayName && user.displayName.includes(searchText))
                    })
            )
};

export default UserService;
