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

export type Step = {
    id: string,
    title: string,
    isCompleted: boolean,
}

export type Habit = {
    id: string,
    title: string,
    reminderTime: string,
    monday: boolean,
    tuesday: boolean,
    wednesday: boolean,
    thursday: boolean,
    friday: boolean,
    saturday: boolean,
    sunday: boolean,
}

export type DiaryEntry = {
    id: string,
    content: string,
}