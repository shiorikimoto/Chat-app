import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'
//import 'firebase/auth'//../firebase.jsから変更?
import firebase from '../firebase.js'
import { AuthContext } from '../AuthService'
import { Link } from 'react-router-dom'


const Login = ({ history }) => {//Loginは関数の名前　history引数　
    //history関数：全ページの推移がはいる　
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    //email・password:名前（state変数の）　　useState('')＝初期値空欄

    const user = useContext(AuthContext)
    if (user) {
        return <Redirect to="/" />
    }//ログイン情報があったらRoomに入る

    const handleSubmit = (e) => {
        e.preventDefault()//デフォルトの動きを抑制する
        firebase.auth().signInWithEmailAndPassword(email, password)// firebaseのログイン機能,メソッド
            .then(() => {
                // pushメソッドを使用することで、引数に指定したパスにリダイレクトを行う
                // pushをすると、新しいページの推移が入るので指定したURL情報が入る。
                history.push("/")
            }).catch(err => {
                // エラー時の処理
                // Formのemail,passwordの入力を削除
                setEmail('')
                setPassword('')
                // ログインエラーの時のポップアップ
                alert('Wrong password.')
                console.log(err)
            })
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='email'>E-mail</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        placeholder='Email'
                        value={email}
                        //  入力された時に、state変数にセット   
                        //  ※onchangeは入力欄や選択肢が変更された時に発生するイベント
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password' 
                        id='password'
                        name='password'  
                        placeholder='password'
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button type='submit'>Login</button>
                <div>
                    <Link to={("/signup")}> Sign Up</Link>
                </div>
            </form>
        </>
    );
};

export default Login