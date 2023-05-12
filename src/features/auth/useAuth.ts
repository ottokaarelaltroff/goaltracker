import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { api } from '../../context/api';
import useAppQueries from '../../context/api/useAppQueries';
import { LoginRequest, RegisterRequest, User } from '../../model/types';
import useStorage from '../../storage/useStorage';
import useAllGoals from '../goals/useAllGoals';
import useUser from './useUser';

const useAuth = () => {

    const [loginError, setLoginError] = useState<boolean | undefined>(false);
    const { setUser } = useUser();
    const { init, reset } = useAppQueries();
    const { remove } = useAllGoals();
    const { getItem, storeItem, removeItem } = useStorage();


    const fetchUserInfo = async (userId: string) => {
        return await api.getUserInfo(userId);
    }

    const userInfo = useMutation(fetchUserInfo, {
        onSuccess: (result: User) => {
            console.log("OTTO getUserInfo success")
            setUser({
                id: result.id,
                userName: result.userName,
                email: result.email
            } as User);
        },
    });

    const onLoginSuccess = () => {
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
        setUser(undefined);
        removeItem('token')
        removeItem('userId')
        remove()
        reset()
    };

    const autoLogin = async () => {
        const jwt = await getItem('token');
        const userId = await getItem('userId');
        console.log("autologin", jwt, userId)
        if (jwt && userId) {
            userInfo.mutate(userId)
        }
    }

    useEffect(() => {
        if (login.data && login.data) {
            setUser({
                id: login.data.id,
                email: login.data.email,
                userName: login.data.userName
            } as User)
            storeItem('token', login.data.token)
            storeItem('userId', login.data.id)
        }
        if (register.data && register.data.token) {
            setUser({
                id: register.data.id,
                email: register.data.email,
                userName: register.data.userName
            } as User)
            storeItem('token', register.data.token)
            storeItem('userId', login.data.id)
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
