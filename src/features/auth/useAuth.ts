import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

import useUser from './useUser';
import { LoginRequest, User } from '../../model/types';
import { api } from '../../context/api';

const useAuth = () => {

    const { setUser } = useUser();

    const onLoginSuccess = () => {
        // alert("login successful " + login.data)
    }

    const onLoginError = () => {
        alert("login error " + login.error)
    }

    const fetchLogin = async (loginParams: LoginRequest) => {
        return await api.login(loginParams);
    }

    const login = useMutation(fetchLogin, {
        onSuccess: onLoginSuccess,
        onError: onLoginError,
    });

    const logOut = () => setUser(undefined);

    useEffect(() => {
        if (login.data) {
            setUser({
                id: login.data.token,
                userName: login.data.firstName
            } as User)
        }
    }, [login.data])

    return {
        login,
        logOut
    };
}

export default useAuth;
