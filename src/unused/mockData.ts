import { Colors } from "../util/Colors";

const mockGoals = [
    {
        title: 'Buy a New Car',
        currentValue: 3588,
        targetValue: 5000,
        unit: '€',
        categories: [
            { title: "Finance", color: Colors.lightBlue },
            { title: "Personal", color: Colors.lightRed }
        ]
    },
    {
        title: 'Finish University',
        currentValue: 1.2,
        targetValue: 3,
        unit: 'years',
        categories: [
            { title: "Personal", color: Colors.lightRed }
        ]
    },
    {
        title: 'Finish University',
        currentValue: 1.2,
        targetValue: 3,
        unit: 'years',
        categories: [
            { title: "Personal", color: Colors.lightRed }
        ]
    },
    {
        title: 'Finish University',
        currentValue: 1.2,
        targetValue: 3,
        unit: 'years',
        categories: [
            { title: "Personal", color: Colors.lightRed }
        ]
    }, {
        title: 'Finish University',
        currentValue: 1.2,
        targetValue: 3,
        unit: 'years',
        categories: [
            { title: "Personal", color: Colors.lightRed }
        ]
    },
]


const mockSteps = [
    {
        id: "1",
        title: 'sell my old car',
        isCompleted: true,
    },
    {
        id: "2",
        title: 'save another 2000€',
        isCompleted: false,
    },
    {
        id: "3",
        title: 'visit dealerships',
        isCompleted: false,
    },
]

const mockHabits = [
    {
        id: "1",
        title: 'save-a-penny-a-day method',
        reminderTime: "0001-01-01T00:00:00",
        monday: true,
        tuesday: false,
        wednesday: false,
        thursday: true,
        friday: false,
        saturday: false,
        sunday: false,
    },
    {
        id: "2",
        title: 'be nice',
        reminderTime: "0001-01-01T00:00:00",
        monday: true,
        tuesday: false,
        wednesday: false,
        thursday: true,
        friday: false,
        saturday: false,
        sunday: false,
    },
    {
        id: "3",
        title: 'wake up at 5am',
        reminderTime: "0001-01-01T00:00:00",
        monday: true,
        tuesday: false,
        wednesday: false,
        thursday: true,
        friday: false,
        saturday: false,
        sunday: false,
    },
]

const mockDiary = [
    {
        id: "1",
        content: 'today was a good day',
    },
    {
        id: "2",
        content: 'today was a bad day',
    },
]

export const mockData = {
    goals: mockGoals,
    steps: mockSteps,
    habits: mockHabits,
    diaryEntries: mockDiary
}

