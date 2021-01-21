
import React from 'react'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Room from './pages/Room'
import { AuthProvider } from "./AuthService"//???実際に、作成したAuthProviderを使用
import LoggedInRoute from './LoggedInRoute'

import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'


const App = () => {
    return (
        // 実行順の確かめ。
        console.log("App# return"),
        // 認証機能を実装して、Roomページに入るときはユーザーがログイン済みか確認し
        // ログインしていればRoomページに入れるようにする
        <AuthProvider>
            <Router>
                <Switch>
                    <LoggedInRoute exact path='/' component={Room} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/signup' component={Signup} />
                </Switch>
            </Router>
        </AuthProvider>
    );
}

export default App
