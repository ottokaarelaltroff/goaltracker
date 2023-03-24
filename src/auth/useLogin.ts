import { useMutation } from '@tanstack/react-query';
import { api } from '../context/api';
import { LoginRequest, User } from '../model/types';
import useUser from '../context/user/useUser';
import { useEffect } from 'react';

const useLogin = () => {

    const { setUser } = useUser();

    const onLoginSuccess = () => {
        // alert("halloo " + login.data)
    }

    const doLogin = async (loginParams: LoginRequest) => {
        return await api.login(loginParams);
    }

    const login = useMutation(doLogin, {
        onSuccess: onLoginSuccess,
    });

    useEffect(() => {
        if (login.data) {
            setUser({
                id: login.data.token,
                userName: login.data.firstName
            } as User)
        }
    }, [login.data])
    return {
        login
    };
}

export default useLogin;
