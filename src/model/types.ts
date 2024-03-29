export type User = {
    id: string,
    token: string,
    email: string,
    userName: string,
}

export type LoginRequest = {
    email: string,
    password: string,
}

export type RegisterRequest = {
    email: string,
    userName: string,
    password: string,
}

export type LoginResponse = {
    id: string,
    token: string,
    email: string,
    userName: string,
}

export type Goal = {
    id?: string,
    title: string,
    isCompleted: boolean,
    targetDate: Date,
    createdAt: Date,
    currentValue: number,
    targetValue: number,
    unit: Unit
    categories?: Category[]
    habits?: Habit[]
    steps?: Step[]
    diaryEntries?: DiaryEntry[]
}

export type Unit = {
    id?: string,
    name: string,
}

export type Category = {
    id?: string,
    name: string,
    color: string,
    goalId?: string,
    categoryId?: string,
}

export type Step = {
    id?: string,
    goalId?: string,
    stepId?: string,
    title: string,
    isCompleted: boolean,
}

export type Habit = {
    id?: string,
    goalId?: string,
    habitId?: string,
    title: string,
    reminderTime: Date,
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