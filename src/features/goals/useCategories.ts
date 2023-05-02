import { useEffect, useState } from 'react';
import { api } from '../../context/api';
import useAppQuery from '../../context/api/useAppQuery';
import { Category } from '../../model/types';
import { useMutation } from '@tanstack/react-query';


export const useCategories = (goalId: string) => {

    const { data: goalCategories, refetch: refetchGoalCategories } = useAppQuery(['goalCategories', goalId], {
        queryFn: () => api.findGoalCategories(goalId) as Promise<Category[]>,
        enabled: false,
    });

    const { data: allCategories, refetch: refetchAllCategories } = useAppQuery(['allCategories'], {
        queryFn: () => api.findAllCategories() as Promise<Category[]>,
        enabled: false,
    });

    const fetchSaveCategory = async (category: Category) => {
        return await api.saveCategory(category);
    }

    const fetchSaveGoalCategory = async (category: Category) => {

        category.goalId = goalId;
        category.categoryId = category.id;
        delete category.id;

        return await api.saveGoalCategory(category);
    }


    const saveGoalCategory = useMutation(fetchSaveGoalCategory, {
        onSuccess: () => fetchGoalCategories(),
        // onError: onLoginError,
    });

    const saveCategory = useMutation(fetchSaveCategory, {
        onSuccess: (result: Category) => {
            console.log("OTTO saveCategory result", result)
            if (goalId) {
                console.log("OTTO goalId", goalId)
                saveGoalCategory.mutate(result);
            }
            refetchAllCategories()
        }
        ,
        // onError: onLoginError,
    });




    const fetchGoalCategories = () => {
        goalId && refetchGoalCategories();
    };

    const fetchAllCategories = () => {
        refetchAllCategories();
    };

    const saveCategoryHandler = (category: Category) => {
        saveCategory.mutate(category);
    };

    return {
        goalCategories,
        allCategories,
        fetchGoalCategories,
        fetchAllCategories,
        saveCategory: saveCategoryHandler,
    };
};
