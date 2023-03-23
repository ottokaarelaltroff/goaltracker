import { useMutation } from '@tanstack/react-query';
import { LoginRequest, User } from '../model/types';
import { apiLogin } from '../context/api/Api';
import useUser from '../context/user/useUser';

export default function useLogin() {
    // const { user, setUser } = useUser();

    const onLoginSuccess = () => {
        // setUser({
        //     id: login.data.token,
        //     userName: login.data.firstName
        // } as User)
        // alert("halloo " + user.userName)
        alert("halloo ")
    }
    const doLogin = async (loginParams: LoginRequest) => {
        return await apiLogin(loginParams);
    }

    const login = useMutation(doLogin, {
        onSuccess: onLoginSuccess,
    });

    return {
        login
    };
}
