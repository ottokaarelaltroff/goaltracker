import { useMutation } from 'react-query';
import { LoginRequest, User } from '../../model/types';
import { login } from '../api/Api';
import useUser from './useUser';

export default function useLogin() {
    const { setUser } = useUser();

    const onLoginSuccess = () => {
        setUser({
            id: login.data.token,
            userName: login.data.firstName
        } as User)
    }
    const doLogin = async ({ email, password }: LoginRequest) => {
        return await login(email, password);
    }

    const login = useMutation(doLogin, {
        onSuccess: onLoginSuccess,
    });

    return {
        login
    };
}
