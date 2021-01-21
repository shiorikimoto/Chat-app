import React, { useState, useEffect, useContext } from 'react'
import firebase from '../firebase.js'
//import 'firebase/auth'//import firebase from '../config/firebase.js'から変更
import { AuthContext } from '../AuthService'

const Room = ({ history }) => {
    const [messages, setMessages] = useState(null)
    const [value, setValue] = useState('')
    const user = useContext(AuthContext)

    // snapshotイベントは、対象のコレクション(今回はmessages)に変更があるたびに発生する
    useEffect(() => {
        firebase.firestore().collection('messages').orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
                // map() メソッドは、与えられた関数を配列のすべての要素に対して呼び出し
                // その結果からなる新しい配列を生成します
                const messages = snapshot.docs.map(doc => {
                    return doc.data()
                })
                // 内部データ確かめよう
                console.log(messages);
                setMessages(messages);
            });
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        firebase.firestore().collection("messages").add({
            name: user.email,
            context: value,
            timestamp: new Date()
        }).then(function (docRef) {
            setValue('');
            console.log("Document written with ID: ", docRef.id);
        }).catch(function (error) {
            setValue('');
            console.error("Error adding document: ", error);
        });
    }

    return (
        <>
            <h1>Room</h1>
            <ul>
                {/* messagesを取得する前に出力されることを抑止する。 */}
                {/* messagesのmapを一つづつ分解する。。 */}
                {messages && messages.map(messages =>
                    <li> {messages.context} </li>
                )}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder='message'
                    value={value}
                    //  入力された時に、state変数にセット
                    //  ※onchangeは入力欄や選択肢が変更された時に発生するイベント
                    onChange={e => setValue(e.target.value)}
                />
                <button type='submit'>submit</button>
            </form>
            {/* ログアウト機能追加 */}
            <button onClick={() => firebase.auth().signOut()}>Logout</button>
        </>
    )
}

export default Room

