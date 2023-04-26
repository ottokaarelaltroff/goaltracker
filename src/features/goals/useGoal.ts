import { Goal } from '../../model/types';
import { useGoalCategories } from './useGoalCategories';
import useAllGoals from './useAllGoals';

export default function useGoal(goalId: string) {
    const { allGoals } = useAllGoals();
    const { categories, fetchGoalCategories, isLoading, isError } = useGoalCategories(goalId);

    let goal: Goal = undefined;
    if (allGoals) {
        goal = allGoals.filter(goal => goal.id === goalId).find(g => g);
        if (goal) {
            if (categories) {
                goal.categories = categories;
            } else {
                fetchGoalCategories();
            }
        }
    }


    return {
        goal: goal,
    };
}
