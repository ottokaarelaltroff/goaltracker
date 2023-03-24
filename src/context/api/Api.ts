import axios from "axios";
import { API_URL } from "../../model/Constants";
import { LoginRequest } from "../../model/types";
import { HttpMethod } from "./useFetch";

export default class Api {

    async fetchApi(method: HttpMethod, path: string, body: any) {
        console.log("OTTO fetch", API_URL + path)
        const response = await axios({
            method: method,
            url: API_URL + path,
            data: body
        });
        console.log("OTTO response", response?.data)
        return await response?.data;
    }


    async login(loginParams: LoginRequest) {
        return await this.fetchApi('POST', '/account/login', loginParams)
    }

}
