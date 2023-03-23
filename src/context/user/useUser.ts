import { useContext } from 'react';
import { UserContext } from './UserProvider';

export default function useUser() {
    const value = useContext(UserContext);
    if (value === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }

    return {
        user: value.user,
        setUser: value.setUser
    };
}
