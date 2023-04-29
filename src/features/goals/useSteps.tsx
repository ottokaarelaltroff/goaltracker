import { api } from '../../context/api';
import useAppQuery from '../../context/api/useAppQuery';
import { Step } from '../../model/types';


export const useSteps = (goalId: string) => {
    const { data: steps, refetch, isLoading, isError } = useAppQuery(['goalSteps', goalId], {
        queryFn: () => api.findGoalSteps(goalId) as Promise<Step[]>,
        enabled: false,
    });

    const fetchGoalSteps = () => {
        refetch();
    };

    return {
        steps,
        fetchGoalSteps,
        isLoading,
        isError,
    };
};
