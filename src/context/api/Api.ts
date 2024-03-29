import axios from "axios";
import { API_URL } from "../../../settings";
import { Category, Goal, Habit, LoginRequest, RegisterRequest, Step, Unit } from "../../model/types";
import useStorage from "../../storage/useStorage";

const Api = () => {

    const { getItem } = useStorage();

    const fetchApi = async (method: string, path: string, body?: any, publicEndpoint?: boolean) => {
        const jwtToken = await getItem('token');
        if (!publicEndpoint && !jwtToken) {
            return null;
        }
        const headers = {
            Authorization: 'Bearer ' + jwtToken
        };
        console.log("OTTO request", method, path, body || '')
        const response = await axios({
            method: method,
            headers: headers,
            url: API_URL + path,
            data: body
        });
        console.log("OTTO response", response?.data)
        return await response?.data;
    };

    // AUTH
    const login = async (loginParams: LoginRequest) => {
        return await fetchApi('POST', '/account/login', loginParams, true)
    };

    const register = async (registerParams: RegisterRequest) => {
        return await fetchApi('POST', '/account/register', registerParams, true)
    };

    const getUserInfo = async (userId: string) => {
        return await fetchApi('GET', `/account/userinfo/${userId}`, true)
    };

    // GOAL
    const findGoal = async (goalId: string) => {
        return await fetchApi('GET', `/goals/${goalId}`)
    };

    const findAllGoals = async () => {
        console.log("OTTO findAllGoals")
        return await fetchApi('GET', '/goals')
    };

    const saveGoal = async (goal: Goal) => {
        return await fetchApi('POST', '/goals', goal)
    };

    const deleteGoal = async (goalId: string) => {
        return await fetchApi('DELETE', `/goals/${goalId}`)
    };


    // UNIT
    const findAllUnits = async () => {
        return await fetchApi('GET', `/units`)
    };

    const saveUnit = async (unit: Unit) => {
        return await fetchApi('POST', `/units`, unit)
    };

    const deleteUnit = async (unitId: string) => {
        return await fetchApi('DELETE', `/units/${unitId}`)
    };


    // CATEGORY
    const findAllCategories = async () => {
        return await fetchApi('GET', `/categories`)
    };

    const saveCategory = async (category: Category) => {
        return await fetchApi('POST', `/categories`, category)
    };

    const deleteCategory = async (categoryId: string) => {
        return await fetchApi('DELETE', `/categories/${categoryId}`)
    };


    // GOALCATEGORY
    const findGoalCategories = async (goalId: string) => {
        return await fetchApi('GET', `/goalcategories/goalId=${goalId}`)
    };

    const saveGoalCategory = async (category: Category) => {
        return await fetchApi('POST', `/goalcategories`, category)
    };

    const deleteGoalCategory = async (goalCategoryId: string) => {
        return await fetchApi('DELETE', `/goalcategories/${goalCategoryId}`)
    };


    // STEP
    const saveStep = async (step: Step) => {
        return await fetchApi('POST', `/steps`, step)
    };

    const deleteStep = async (stepId: string) => {
        return await fetchApi('DELETE', `/steps/${stepId}`)
    };


    // GOALSTEP
    const findGoalSteps = async (goalId: string) => {
        return await fetchApi('GET', `/goalsteps/goalId=${goalId}`)
    };

    const saveGoalStep = async (step: Step) => {
        return await fetchApi('POST', `/goalsteps`, step)
    };


    // HABIT
    const findAllHabits = async () => {
        return await fetchApi('GET', `/habits`)
    };


    const saveHabit = async (habit: Habit) => {
        return await fetchApi('POST', `/habits`, habit)
    };

    const deleteHabit = async (habitId: Habit) => {
        return await fetchApi('DELETE', `/habits/${habitId}`)
    };


    // GOALHABIT
    const findGoalHabits = async (goalId: string) => {
        return await fetchApi('GET', `/goalhabits/goalId=${goalId}`)
    };

    const saveGoalHabit = async (habit: Habit) => {
        return await fetchApi('POST', `/goalhabits`, habit)
    };

    const deleteGoalHabit = async (goalHabitId: string) => {
        return await fetchApi('DELETE', `/goalhabits/${goalHabitId}`)
    };



    return {
        login,
        register,
        findGoal,
        findAllGoals,
        findGoalCategories,
        findGoalHabits,
        findGoalSteps,
        findAllUnits,
        findAllCategories,
        saveCategory,
        saveGoalCategory,
        deleteCategory,
        deleteGoalCategory,
        deleteGoal,
        saveGoal,
        saveUnit,
        deleteUnit,
        saveStep,
        deleteStep,
        saveGoalStep,
        saveHabit,
        deleteHabit,
        saveGoalHabit,
        findAllHabits,
        deleteGoalHabit,
        getUserInfo
    };
};

export default Api;