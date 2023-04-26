import { useContext } from 'react';
import { GoalContext } from '../../context/providers/GoalProvider';

export default function useAllGoals() {
    const value = useContext(GoalContext);
    if (value === undefined) {
        throw new Error('useGoals must be used within a GoalProvider');
    }

    return {
        allGoals: value.allGoals,
        fetchAllGoals: value.fetchAllGoals,
        isLoading: value.isLoading,
        isError: value.isError,
    };
}
