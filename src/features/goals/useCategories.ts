import { useMutation } from '@tanstack/react-query';
import { api } from '../../context/api';
import useAppQuery from '../../context/api/useAppQuery';
import { Category } from '../../model/types';


export const useCategories = (goalId: string) => {

    const { data: goalCategories, refetch: refetchGoalCategories } = useAppQuery(['goalCategories', goalId], {
        queryFn: () => api.findGoalCategories(goalId) as Promise<Category[]>,
        enabled: false,
    });

    const fetchGoalCategories = () => {
        goalId && refetchGoalCategories();
    };

    const { data: allCategories, refetch: refetchAllCategories } = useAppQuery(['allCategories'], {
        queryFn: () => api.findAllCategories() as Promise<Category[]>,
        enabled: false,
    });

    const fetchAllCategories = () => {
        refetchAllCategories();
    };


    const fetchSaveGoalCategory = async (category: Category) => {
        category.goalId = goalId;
        category.categoryId = category.categoryId ? category.categoryId : category.id;
        delete category.id;
        return await api.saveGoalCategory(category);
    }


    const saveGoalCategory = useMutation(fetchSaveGoalCategory, {
        onSuccess: () => fetchGoalCategories(),
    });

    const fetchSaveCategory = async (category: Category) => {
        return await api.saveCategory(category);
    }

    const saveCategory = useMutation(fetchSaveCategory, {
        onSuccess: (result: Category) => {
            if (goalId) {
                saveGoalCategory.mutate(result);
            }
            // refetchAllCategories()
        }
    });

    const saveCategoryHandler = (category: Category) => {
        saveCategory.mutate(category);
    };

    const saveGoalCategoryHandler = (category: Category) => {
        saveGoalCategory.mutate(category);
    };

    const fetchDeleteGoalCategory = async (categoryId: string) => {
        return await api.deleteGoalCategory(categoryId);
    }

    const deleteGoalCategory = useMutation(fetchDeleteGoalCategory, {
        onSuccess: () => fetchGoalCategories()
    });

    const deleteGoalCategoryHandler = (category: Category) => {
        deleteGoalCategory.mutate(category.id);
    };



    return {
        goalCategories,
        allCategories,
        fetchGoalCategories,
        fetchAllCategories,
        saveCategory: saveCategoryHandler,
        saveGoalCategory: saveGoalCategoryHandler,
        deleteGoalCategory: deleteGoalCategoryHandler,
    };
};
