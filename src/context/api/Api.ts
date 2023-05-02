import axios from "axios";
import { API_URL } from "../../../settings";
import { Category, LoginRequest } from "../../model/types";
import useStorage from "../../storage/useStorage";

const Api = () => {

    const { getItem } = useStorage();

    const fetchApi = async (method: string, path: string, body?: any) => {
        const jwtToken = await getItem('token');
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

    const login = async (loginParams: LoginRequest) => {
        return await fetchApi('POST', '/account/login', loginParams)
    };

    const findAllGoals = async () => {
        return await fetchApi('GET', '/goals')
    };

    const findGoalCategories = async (goalId: string) => {
        return await fetchApi('GET', `/goalcategories/goalId=${goalId}`)
    };

    const findGoalHabits = async (goalId: string) => {
        return await fetchApi('GET', `/goalhabits/goalId=${goalId}`)
    };

    const findGoalSteps = async (goalId: string) => {
        return await fetchApi('GET', `/goalsteps/goalId=${goalId}`)
    };

    const findAllUnits = async () => {
        return await fetchApi('GET', `/units`)
    };

    const findAllCategories = async () => {
        return await fetchApi('GET', `/categories`)
    };

    const saveCategory = async (category: Category) => {
        return await fetchApi('POST', `/categories`, category)
    };

    const saveGoalCategory = async (category: Category) => {
        return await fetchApi('POST', `/goalcategories`, category)
    };

    return {
        login,
        findAllGoals,
        findGoalCategories,
        findGoalHabits,
        findGoalSteps,
        findAllUnits,
        findAllCategories,
        saveCategory,
        saveGoalCategory
    };
};

export default Api;