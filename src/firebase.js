import firebase from 'firebase'//カリキュラムの通りのコードだと古いらしい
import 'firebase/auth'
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyDZ_o-tb0rZoaZvhpQzX2hI17PAT5lsi14",
    authDomain: "chat-app-64384.firebaseapp.com",
    projectId: "chat-app-64384",
    storageBucket: "chat-app-64384.appspot.com",
    messagingSenderId: "96234471466",
    appId: "1:96234471466:web:31b239f4d588cdbdeb4353"
}

firebase.initializeApp(firebaseConfig)

export default firebase