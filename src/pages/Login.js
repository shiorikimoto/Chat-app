import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'
//import 'firebase/auth'//../config/firebase.jsから変更
import firebase from '../firebase.js'
import { AuthContext } from '../AuthService'
import { Link } from 'react-router-dom';

// history関数を引数とするLoginという関数を宣言している
// history関数は全てのページの推移が入っている。
// pushをすると、新しいページの推移が入るので新しいページのURL情報が入る。
const Login = ({ history }) => {
    // email という名前の state 変数を宣言、初期値 '' をセット
    const [email, setEmail] = useState('');
    // password という名前の state 変数を宣言、初期値 '' をセット
    const [password, setPassword] = useState('');

    // ユーザーのログイン情報がある場合はRoomにリダイレクト
    const user = useContext(AuthContext)
    if (user) {
        return <Redirect to="/" />;
    }

    const handleSubmit = (e) => {
        // デフォルトの動きを抑制 
        e.preventDefault();
        // firebaseの機能を使用したログイン機能
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                // pushメソッドを使用することで、引数に指定したパスにリダイレクトを行う
                // pushをすると、新しいページの推移が入るので指定したURL情報が入る。
                history.push("/");
            }).catch(err => {
                // エラー時の処理
                // Formのemail,passwordの入力を削除
                setEmail('');
                setPassword('');
                // ログインエラーの時のポップアップ
                alert('Wrong password.');
                console.log(err);
            });
    };

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='email'>E-mail</label>
                    <input
                        type='email'
                        // getElementByIdで取得するID
                        id='email'
                        name='email'
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
                        type='password'
                        // getElementByIdで取得するID  
                        id='password'
                        name='password'
                        // 初期値'password'を入れる  
                        placeholder='password'
                        value={password}
                        //  入力された時に、state変数にセット   
                        //  ※onchangeは入力欄や選択肢が変更された時に発生するイベント  
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