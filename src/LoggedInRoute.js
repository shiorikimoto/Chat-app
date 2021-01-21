import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from './AuthService'

// ユーザーの中身を確かめるため用メソッド。
const userDisplay = (user) => {
    if (user == null) {
        console.log("LoggedInRoute# user : null");
    } else {
        console.log("LoggedInRoute# user : " + Object.values(user));
    }
}

const LoggedInRoute = ({ component: Component, ...rest }) => {
    const user = useContext(AuthContext)

    // ユーザー情報が入っていればcomponentに入っているのをそのまま表示
    // 入っていなければloginページにリダイレクト
    return (
        // ユーザーの確かめ
        userDisplay(user),
        <Route
            {...rest}
            render={props => user ? (<Component {...props} />) : (<Redirect to={'/login'} />)}
        />
    )
}

export default LoggedInRoute