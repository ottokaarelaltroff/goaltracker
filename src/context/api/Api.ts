import { API_URL } from "../../model/Constants";
import { LoginRequest } from "../../model/types";
import useFetch, { FetchProps, HttpMethod } from "./useFetch"

// const api = () => {

function fetch(method: HttpMethod, path: string, body: any) {
    const query = {
        method: method,
        url: API_URL + path,
        body: body
    } as FetchProps;
    const { isLoading, data, error } = useFetch(query);
    return data;
}


export const login = async (loginParams: LoginRequest) => {
    return await fetch('GET', '/account/login', loginParams)
}

//     return {
//         login: login
//     }
// }

// export default api;