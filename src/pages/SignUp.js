//import React from 'react'
import React, { useState } from 'react'
import firebase from '../firebase.js'
//import 'firebase/auth'//import firebase from '../firebase.js'から変更

// アロー関数式は、より短く記述できる、通常の function 式の代替構
// history関数を引数とするSignupという関数を宣言している
// history関数は全てのページの推移が入っている。
// pushをすると、新しいページの推移が入るので新しいページのURL情報が入る。
const Signup = ({ history }) => {
    // email という名前の state 変数を宣言、初期値 '' をセット
    const [email, setEmail] = useState('');
    // password という名前の state 変数を宣言、初期値 '' をセット
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        // デフォルトの動きを抑制 
        e.preventDefault();
        // firebaseの機能を使用したサインアップ機能
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                // pushメソッドを使用することで、引数に指定したパスにリダイレクトを行う
                // pushをすると、新しいページの推移が入るので指定したURL情報が入る。
                history.push("/login");
            })
            .catch(err => {
                // Formのemail,passwordの入力を削除
                setEmail('');
                setPassword('');
                alert('Wrong .');// 作成失敗の時のポップアップ
                console.log(err)
            })
    }

    // 呼び出された後以下htmlを返す。
    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='email'>E-mail</label>
                    <input
                        name='email'
                        type='email'
                        // getElementByIdで取得するID
                        id='email'
                        // 初期値'Email'を入れる
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
                        name='password'
                        type='password'
                        // getElementByIdで取得するID
                        id='password'
                        // 初期値'password'を入れる
                        placeholder='Password'
                        value={password}
                        //  入力された時に、state変数にセット
                        //  ※onchangeは入力欄や選択肢が変更された時に発生するイベント
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )
}

export default Signup
