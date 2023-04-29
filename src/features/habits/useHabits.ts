import { api } from '../../context/api';
import useAppQuery from '../../context/api/useAppQuery';
import { Habit } from '../../model/types';


export const useHabits = (goalId: string) => {
    const { data: habits, refetch, isLoading, isError } = useAppQuery(['goalHabits', goalId], {
        queryFn: () => api.findGoalHabits(goalId) as Promise<Habit[]>,
        enabled: false,
    });

    const fetchGoalHabits = () => {
        refetch();
    };

    return {
        habits,
        fetchGoalHabits,
        isLoading,
        isError,
    };
};
