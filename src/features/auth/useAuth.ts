import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { api } from '../../context/api';
import useAppQueries from '../../context/api/useAppQueries';
import { LoginRequest, RegisterRequest, User } from '../../model/types';
import useStorage from '../../storage/useStorage';
import useUser from './useUser';
import useAllGoals from '../goals/useAllGoals';

const useAuth = () => {

    const [loginError, setLoginError] = useState<boolean | undefined>(false);
    const { setUser } = useUser();
    const { init, reset } = useAppQueries();
    const { remove } = useAllGoals();
    const { getItem, storeItem, removeItem } = useStorage();

    const onLoginSuccess = () => {
        // alert("login successful " + login.data)
        init()
    }

    const fetchLogin = async (loginParams: LoginRequest) => {
        return await api.login(loginParams);
    }

    const login = useMutation(fetchLogin, {
        onSuccess: onLoginSuccess,
        onError: () => setLoginError(true),
    });


    const fetchRegister = async (registerParams: RegisterRequest) => {
        return await api.register(registerParams);
    }

    const register = useMutation(fetchRegister, {
        onSuccess: () => { },
        onError: () => setLoginError(true),
    });

    const logOut = () => {
        setUser(undefined),
            removeItem('token')
        remove()
        reset()
    };

    const autoLogin = async () => {
        const jwt = await getItem('token');
        console.log("autologin", jwt)
        if (jwt) {
            setUser({
                id: jwt,
                userName: "Ottokaarel"
            } as User);
            return true;
        }
        return false
    }

    useEffect(() => {
        if (login.data && login.data.token) {
            setUser({
                id: login.data.token,
                email: login.data.email,
                userName: login.data.userName
            } as User)
            storeItem('token', login.data.token)
        }
        if (register.data && register.data.token) {
            setUser({
                id: register.data.token,
                email: register.data.email,
                userName: register.data.userName
            } as User)
            storeItem('token', register.data.token)
        }
    }, [login.data, register.data])

    return {
        login,
        logOut,
        autoLogin,
        loginError,
        setLoginError,
        register
    };
}

export default useAuth;
