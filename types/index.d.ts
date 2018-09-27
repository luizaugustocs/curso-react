import {firestore, Observer, User, Unsubscribe} from 'firebase';


export type UserData = {
    uid: string,
    userName?: string,
    displayName?: string,
    photoURL?: string,
    email: string
}

export type UpdateUser = {
    displayName: string,
    userName: string,
    photoURL: string
}

export type Tweet = {
    uid: string,
    content: string,
    author: string,
    timestamp: firestore.Timestamp,
    authorName?: string,
    authorUserName?: string,
    authorPhotoURL?: string
}


export interface UserService {
    followUser(userToFollow: UserData): Promise<void>;

    updateUserData(userData: UpdateUser): Promise<void>;

    getUserData(userId: string): Promise<UserData>;

    searchUser(searchText?: string): Promise<UserData>
}

export interface TweetService {
    newTweet(tweetContent: string): Promise<firestore.DocumentReference>;
    getUserTweets(user: UserData, lastTweet?: firestore.DocumentReference): Promise<Array<firestore.DocumentSnapshot>>;
    getUserFeed(user: UserData, lastTweet?: firestore.DocumentReference): Promise<Array<firestore.DocumentSnapshot>>;
}

export interface AuthService {
    onAuthChange(callback:
        | Observer<any>
        | ((a: User | null) => any)): Unsubscribe;
    loginWithGoogle() : User | null;
    getCurrentUser() : User | null;
    logout(): Promise<void>;
}
