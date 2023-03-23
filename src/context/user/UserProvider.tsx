import { Dispatch, SetStateAction, createContext, useState } from 'react';
import { LoginResponse, User } from '../../model/types';
import useAppQuery from '../api/useAppQuery';
import api from '../api/Api';


interface UserContext {
    user: User | undefined;
    setUser: Dispatch<SetStateAction<User>>;
}

interface UserProviderProps {
    children: React.ReactNode;
}

export const UserContext = createContext<UserContext | undefined>(undefined);

const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User | undefined>();

    const value = {
        user,
        setUser
    };
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;