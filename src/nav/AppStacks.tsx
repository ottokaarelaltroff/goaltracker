import { createStackNavigator } from "@react-navigation/stack";
import { AuthScreen } from "../features/auth/AuthScreen";
import { CreateAccountScreen } from "../features/auth/CreateAccountScreen";
import { LoginScreen } from "../features/auth/LoginScreen";
import { AllGoalsScreen } from "../features/goals/AllGoalsScreen";
import { GoalScreen } from "../features/goals/GoalScreen";
import useAllGoals from "../features/goals/useAllGoals";
import { HabitsScreen } from "../features/habits/HabitsScreen";
import { SettingsScreen } from "../features/settings/SettingsScreen";
import { Colors } from "../util/Colors";

const AuthStack = createStackNavigator();
const HabitsStack = createStackNavigator();
const GoalsStack = createStackNavigator();
const SettingsStack = createStackNavigator();

const authStackOptions = {
  headerShown: true,
  headerTintColor: Colors.orange,
  headerStyle: {
    backgroundColor: Colors.secondary
  },
}
export const AuthStackScreen = () => (
  <AuthStack.Navigator screenOptions={authStackOptions}>
    <AuthStack.Screen name="Welcome" component={AuthScreen} options={{ title: "GoalTracker", headerShown: false }} />
    <AuthStack.Screen name="SignIn" component={LoginScreen} options={{ title: "Sign In" }} />
    <AuthStack.Screen name="CreateAccount" component={CreateAccountScreen} options={{ title: "Create an Account" }} />
  </AuthStack.Navigator>
)

export const HabitsStackScreen = () => (
  <HabitsStack.Navigator screenOptions={{
    headerShown: false
  }}>
    <HabitsStack.Screen name="HabitsScreen" component={HabitsScreen} />
  </HabitsStack.Navigator>
)

export const GoalStackScreen = () => {
  const { selectedGoal } = useAllGoals();
  return (
    <GoalsStack.Navigator screenOptions={{
      headerShown: true,
      headerBackTitle: ' ',
      headerStyle: {
        backgroundColor: Colors.primary,
        height: 120,
        borderBottomWidth: 0,
        borderBottomColor: 'transparent',

      },
      headerTitleAlign: selectedGoal ? 'center' : 'left',
      headerTitleStyle: {
        fontSize: selectedGoal ? 24 : 32,
        color: Colors.lightGray,
      },
      headerTitleContainerStyle: {
        marginLeft: 30,
      },
    }}>
      <GoalsStack.Screen name="AllGoalsScreen" component={AllGoalsScreen} options={{ headerTitle: 'My Goals' }} />
      <GoalsStack.Screen name="GoalScreen" component={GoalScreen} options={{ headerTitle: selectedGoal?.title || 'Goal' }} />
    </GoalsStack.Navigator>
  )
}

export const SettingsStackScreen = () => (
  <SettingsStack.Navigator screenOptions={{
    headerShown: false
  }}>
    <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen} />
  </SettingsStack.Navigator>
)