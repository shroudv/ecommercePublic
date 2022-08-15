import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Cookies from 'universal-cookie';
import { useSnackbar } from 'notistack';

export const AuthProviderContext = React.createContext();

function AuthProvider(props) {

    const { enqueueSnackbar } = useSnackbar();
    const [getAuth, setAuth] = useState();
    const cookie = new Cookies();
    useEffect(() => {
        if (cookie.get('token')) {
            axios.get(`${process.env.REACT_APP_API_HOST}/user`,
                {
                    headers: {
                        'Accept': 'application/json', 'Authorization': `Bearer ${cookie.get('token')}`
                    }
                })
                .then(res => setAuth(res.data))
                .catch(err => enqueueSnackbar('Login API Xətası: ' + err.code, { variant: 'error' }))
        }
    }, [])

    return (
        <AuthProviderContext.Provider value={getAuth}>
            {props.children}
        </AuthProviderContext.Provider>
    )
}

export default AuthProvider