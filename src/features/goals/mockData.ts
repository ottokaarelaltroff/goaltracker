import { Colors } from "../../util/Colors";

export const mockGoals = [
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

    }
]