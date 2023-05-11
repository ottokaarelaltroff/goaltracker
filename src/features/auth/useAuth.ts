import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import useUser from './useUser';
import { LoginRequest, LoginResponse, RegisterRequest, User } from '../../model/types';
import { api } from '../../context/api';
import useStorage from '../../storage/useStorage';
import useAllGoals from '../goals/useAllGoals';

interface AuthProps {
    onLoginError?: () => void;
}

const useAuth = () => {

    const [loginError, setLoginError] = useState<boolean | undefined>(false);
    const { setUser } = useUser();
    const { getItem, storeItem } = useStorage();
    const { reset } = useAllGoals();

    const onLoginSuccess = () => {
        // alert("login successful " + login.data)
    }

    const fetchLogin = async (loginParams: LoginRequest) => {
        return await api.login(loginParams);
    }

    const login = useMutation(fetchLogin, {
        onSuccess: onLoginSuccess,
        onError: () => setLoginError(true),
    });


    const fetchRegister = async (registerParams: RegisterRequest) => {
        delete registerParams.userName
        return await api.register(registerParams);
    }

    const register = useMutation(fetchRegister, {
        onSuccess: () => { },
        onError: () => setLoginError(true),
    });

    const logOut = () => {
        reset();
        setUser(undefined)
    };

    const autoLogin = async () => {
        const jwt = await getItem('token');
        if (jwt) {
            // setUser({
            //     id: jwt,
            //     userName: "Ottokaarel"
            // } as User);
        }
    }

    useEffect(() => {
        if (login.data && login.data.token) {
            setUser({
                id: login.data.token,
                userName: login.data.firstName
            } as User)
            storeItem('token', login.data.token)
        }
        if (register.data && register.data.token) {
            setUser({
                id: register.data.token,
                userName: register.data.firstName
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
