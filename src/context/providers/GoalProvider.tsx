import { createContext } from 'react';
import { Goal } from '../../model/types';
import { api } from '../api';
import useAppQuery from '../api/useAppQuery';


interface GoalContext {
    allGoals: Goal[] | undefined;
    fetchAllGoals: () => void;
    isLoading: boolean;
    isError: boolean;
}

interface GoalProviderProps {
    children: React.ReactNode;
}

export const GoalContext = createContext<GoalContext | undefined>(undefined);

const GoalProvider = ({ children }: GoalProviderProps) => {
    const { data: allGoals, refetch, isError, isLoading } = useAppQuery(['allGoals'], {
        queryFn: () => api.findAllGoals() as Promise<Goal[]>,
        enabled: true,
    });

    const fetchAllGoals = () => {
        refetch();
    };

    const value = {
        allGoals,
        fetchAllGoals,
        isLoading,
        isError
    };
    return <GoalContext.Provider value={value}>{children}</GoalContext.Provider>;
};

export default GoalProvider;