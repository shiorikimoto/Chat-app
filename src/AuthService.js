//import React, { useState, useEffect } from 'react'
//import 'firebase/auth'//import firebase from '../config/firebase.js'から変更


import React, { useState, useEffect } from 'react'
import firebase from './firebase'

// コンテクストオブジェクトを作成します(これでコンテキストを使用出来る。)
const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    // 現在ログインしているユーザーを取得するには、
    // Auth オブジェクトでオブザーバーを設定することをおすすめします。
    // useEffect に渡された関数はレンダーの結果が画面に反映された後に動作します
    useEffect(() => {
        console.log("AuthProvider# useEffect");
        // onAuthStateChanged ユーザーのログイン時、ログアウト時に必ず呼び出されるメソッド
        // もっというと状態が変化する事で呼び出される
        firebase.auth().onAuthStateChanged(user => {
            // ユーザーオブジェクトを変数に代入
            setUser(user);
            // ユーザー認証終了フラグ
            setIsAuthChecked(true);
        });
        // 空配列を渡す事で初回のみ実行する
    }, []);

    return (
        // 実行順の確かめ。
        console.log("AuthProvider# return"),
        // contextを使用し、user情報を別のコンポーネントに引き継ぐ
        // App.jsの AuthProvider で囲んでいる子要素を'children'で取得できる。
        // 認証終了のチェックを入れることでリロード問題を解決
        <>
            {isAuthChecked && (
                <AuthContext.Provider value={user}>
                    {children}
                </AuthContext.Provider>
            )}
        </>
    )
}

export {
    AuthContext,
    AuthProvider
}