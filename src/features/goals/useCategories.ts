import { api } from '../../context/api';
import useAppQuery from '../../context/api/useAppQuery';
import { Category } from '../../model/types';


export const useCategories = (goalId: string) => {
    const { data: goalCategories, refetch: refetchGoalCategories } = useAppQuery(['goalCategories', goalId], {
        queryFn: () => api.findGoalCategories(goalId) as Promise<Category[]>,
        enabled: false,
    });

    const { data: allCategories, refetch: refetchAllCategories } = useAppQuery(['allCategories'], {
        queryFn: () => api.findAllCategories() as Promise<Category[]>,
        enabled: false,
    });

    const fetchGoalCategories = () => {
        goalId && refetchGoalCategories();
    };

    const fetchAllCategories = () => {
        refetchAllCategories();
    };

    return {
        goalCategories,
        allCategories,
        fetchGoalCategories,
        fetchAllCategories,
    };
};
