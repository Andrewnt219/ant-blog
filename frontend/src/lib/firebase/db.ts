import firebase from 'firebase/app';
import 'firebase/firestore';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyCwc1a2UrN3Te84b84nC4s2WNQ1yfklrwg',
    authDomain: 'ant-blog-31848.firebaseapp.com',
    projectId: 'ant-blog-31848',
    storageBucket: 'ant-blog-31848.appspot.com',
    messagingSenderId: '1049775628512',
    appId: '1:1049775628512:web:d86fc21b2f7ceee3ed3085',
    measurementId: 'G-8WLV3BFCD3',
  });
}

export default firebase.firestore();
