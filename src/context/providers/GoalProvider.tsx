import { createContext, useEffect, useState } from 'react';
import { Goal } from '../../model/types';
import { api } from '../api';
import useAppQuery from '../api/useAppQuery';
import useUser from '../../features/auth/useUser';


interface GoalContext {
    allGoals: Goal[] | undefined;
    fetchAllGoals: () => void;
    remove: () => void;
    isLoading: boolean;
    isError: boolean;
    selectedGoal?: Goal | undefined;
    setSelectedGoal: React.Dispatch<React.SetStateAction<Goal>>
}

interface GoalProviderProps {
    children: React.ReactNode;
}

export const GoalContext = createContext<GoalContext | undefined>(undefined);

const GoalProvider = ({ children }: GoalProviderProps) => {
    const { user } = useUser();
    const { data: allGoals, refetch: fetchAllGoals, isError, isLoading, remove } = useAppQuery(['allGoals'], {
        queryFn: () => api.findAllGoals() as Promise<Goal[]>,
        enabled: !!user,
    });
    const [selectedGoal, setSelectedGoal] = useState<Goal | undefined>();


    const value = {
        allGoals,
        fetchAllGoals,
        isLoading,
        isError,
        selectedGoal,
        setSelectedGoal,
        remove
    };
    return <GoalContext.Provider value={value}>{children}</GoalContext.Provider>;
};

export default GoalProvider;