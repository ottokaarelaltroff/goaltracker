import { api } from '../../context/api';
import useAppQuery from '../../context/api/useAppQuery';
import { Category } from '../../model/types';


export const useGoalCategories = (goalId: string) => {
    const { data: categories, refetch, isLoading, isError } = useAppQuery(['goalCategories', goalId], {
        queryFn: () => api.findGoalCategories(goalId) as Promise<Category[]>,
        enabled: false,
    });

    const fetchGoalCategories = () => {
        goalId && refetch();
    };

    return {
        categories,
        fetchGoalCategories,
        isLoading,
        isError,
    };
};
