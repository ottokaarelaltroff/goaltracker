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

export type Goal = {
    id: string,
    title: string,
    isCompleted: boolean,
    targetDate: Date,
    currentValue: number,
    targetValue: number,
    unit: Unit
    categories: Category[]
}

export type Unit = {
    id: string,
    name: string,
}

export type Category = {
    id: string,
    name: string,
    color: string,
    goalId?: string,
    categoryId?: string,
}