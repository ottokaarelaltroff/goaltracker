import axios from "axios";
import { API_URL } from "../../../settings";
import { LoginRequest } from "../../model/types";
import useStorage from "../../storage/useStorage";

const Api = () => {

    const { getItem } = useStorage();

    const fetchApi = async (method: string, path: string, body?: any) => {
        const jwtToken = await getItem('token');
        const headers = {
            Authorization: 'Bearer ' + jwtToken
        };
        console.log("OTTO request", method, headers, path, body)
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

    return {
        login,
        findAllGoals,
        findGoalCategories,
    };
};

export default Api;