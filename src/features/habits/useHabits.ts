import { api } from '../../context/api';
import useAppQuery from '../../context/api/useAppQuery';
import { Habit } from '../../model/types';
import useAllGoals from '../goals/useAllGoals';


export const useHabits = () => {
    const { selectedGoal } = useAllGoals();

    const { data: habits, refetch, isLoading, isError } = useAppQuery(['goalHabits', selectedGoal?.id], {
        queryFn: () => api.findGoalHabits(selectedGoal.id) as Promise<Habit[]>,
        enabled: false,
    });

    const fetchGoalHabits = () => {
        selectedGoal?.id && refetch();
    };

    return {
        habits,
        fetchGoalHabits,
        isLoading,
        isError,
    };
};
