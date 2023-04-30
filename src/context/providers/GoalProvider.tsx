import { createContext, useState } from 'react';
import { Goal } from '../../model/types';
import { api } from '../api';
import useAppQuery from '../api/useAppQuery';


interface GoalContext {
    allGoals: Goal[] | undefined;
    fetchAllGoals: () => void;
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
    const { data: allGoals, refetch, isError, isLoading } = useAppQuery(['allGoals'], {
        queryFn: () => api.findAllGoals() as Promise<Goal[]>,
        enabled: true,
    });
    const [selectedGoal, setSelectedGoal] = useState<Goal | undefined>();

    const fetchAllGoals = () => {
        refetch();
    };

    const value = {
        allGoals,
        fetchAllGoals,
        isLoading,
        isError,
        selectedGoal,
        setSelectedGoal
    };
    return <GoalContext.Provider value={value}>{children}</GoalContext.Provider>;
};

export default GoalProvider;