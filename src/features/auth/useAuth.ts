import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

import useUser from './useUser';
import { LoginRequest, User } from '../../model/types';
import { api } from '../../context/api';
import useStorage from '../../storage/useStorage';

const useAuth = () => {

    const { user, setUser } = useUser();
    const { getItem, storeItem } = useStorage();

    const onLoginSuccess = () => {
        alert("login successful " + login.data)
    }

    const onLoginError = () => {
        alert("login error " + login.error)
    }

    const autoLogin = async () => {
        const jwt = await getItem('token');
        if (jwt) {
            setUser({
                id: jwt,
                userName: "user"
            } as User);
        }
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
        if (login.data && login.data.token) {
            setUser({
                id: login.data.token,
                userName: login.data.firstName
            } as User)
            storeItem('token', login.data.token)
        }
    }, [login.data])

    return {
        login,
        logOut,
        autoLogin
    };
}

export default useAuth;
