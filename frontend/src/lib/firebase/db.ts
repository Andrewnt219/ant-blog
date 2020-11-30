import 'firebase/firestore';

import firebase from 'firebase/app';

if (!firebase.apps.length) {
	firebase.initializeApp({
		apiKey: "AIzaSyBoeEF0oiFKXVbuSjgnvbWcz2YaXuB8JSY",
		authDomain: "rosedang-a8fb4.firebaseapp.com",
		databaseURL: "https://rosedang-a8fb4.firebaseio.com",
		projectId: "rosedang-a8fb4",
		storageBucket: "rosedang-a8fb4.appspot.com",
		messagingSenderId: "340684997288",
		appId: "1:340684997288:web:cc17d42386abd4dc44b89d",
		measurementId: "G-88F6JRKQGG",
	});
}

export default firebase.firestore();
