import React, { useState, useEffect, useContext } from 'react'
import firebase from '../firebase.js'
//import 'firebase/auth'//import firebase from '../firebase.js'から変更
import { AuthContext } from '../AuthService'

const Room = ({ history }) => {
    const [messages, setMessages] = useState(null)
    const [value, setValue] = useState('')
    const user = useContext(AuthContext)

    useEffect(() => {
        firebase.firestore().collection('messages').orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
                //snapshotイベント
                //('messages')が変わるたびにおこる
                const messages = snapshot.docs.map(doc => {
                    return doc.data()
                })

                setMessages(messages);
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        firebase.firestore().collection("messages").add({
            name: user.email,
            context: value,
            timestamp: new Date()
        }).then(function (docRef) {
            setValue('')
            console.log("Document written with ID: ", docRef.id)
        }).catch(function (error) {
            setValue('')
            console.error("Error adding document: ", error)
        })
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
                    onChange={e => setValue(e.target.value)}// 入力された時にstate変数に入る
                    //onChange
                />
                <button type='submit'>submit</button>
            </form>
            {/* ログアウト機能追加 */}
            <button onClick={() => firebase.auth().signOut()}>Logout</button>
        </>
    )
}

export default Room

