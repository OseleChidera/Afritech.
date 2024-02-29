// firebaseAuth.js

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig'; // Import your Firebase authentication instance

export const setupAuthObserver = (callback) => {
    onAuthStateChanged(auth, (user) => {
        callback(user);
    });
};
