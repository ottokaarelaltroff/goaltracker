export type User = {
    id: string,
    userName: string,
}

export type LoginRequest = {
    email: string,
    password: string,
}

export type LoginResponse = {
    token: string,
    firstName: string,
    lastName: string,
}