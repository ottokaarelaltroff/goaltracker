import axios from "axios";
import { API_URL } from "../../../settings";
import { LoginRequest } from "../../model/types";

export default class Api {

    async fetchApi(method: string, path: string, body?: any) {

        const headers = {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjliYWU1MjI2LTQ4ZmYtNGJiYS1iZDBkLTQ0YTMxOGZkZmIxMyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJvdHRva2FhcmVsLmFsdHJvZmZAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoib3R0b2thYXJlbC5hbHRyb2ZmQGdtYWlsLmNvbSIsIkFzcE5ldC5JZGVudGl0eS5TZWN1cml0eVN0YW1wIjoiM0tDTlpWUktOSkRHT0ZCNElZVFU3UlhRU1FWQ1hMWFciLCJleHAiOjE2ODUxMzA1MDAsImlzcyI6Iml0Y29sbGVnZS50YWx0ZWNoLmVlIiwiYXVkIjoiaXRjb2xsZWdlLnRhbHRlY2guZWUifQ.GL9izCj_pIsIvTS5a77Oafs7P04NR9SySi-qXHTkCUE"
        }
        console.log("OTTO request", method, headers, path, body)
        const response = await axios({
            method: method,
            headers: headers,
            url: API_URL + path,
            data: body
        });
        console.log("OTTO response", response?.data)
        return await response?.data;
    }


    async login(loginParams: LoginRequest) {
        return await this.fetchApi('POST', '/account/login', loginParams)
    }

    async findAllGoals() {
        return await this.fetchApi('GET', '/goals')
    }

    async findGoalCategories(goalId: string) {
        return await this.fetchApi('GET', `/goalcategories/goalId=${goalId}`)
    }
}
