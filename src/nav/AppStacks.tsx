import { createStackNavigator } from "@react-navigation/stack";
import { Colors } from "../util/Colors";
import { AuthScreen } from "../features/auth/AuthScreen";
import { LoginScreen } from "../features/auth/LoginScreen";
import { CreateAccountScreen } from "../features/auth/CreateAccountScreen";
import { HabitsScreen } from "../features/habits/HabitsScreen";
import { AllGoalsScreen } from "../features/goals/AllGoalsScreen";
import { SettingsScreen } from "../features/settings/SettingsScreen";
import { GoalScreen } from "../features/goals/GoalScreen";

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

export const GoalStackScreen = () => (
  <GoalsStack.Navigator screenOptions={{
    headerShown: false
  }}>
    <GoalsStack.Screen name="GoalsScreen" component={AllGoalsScreen} />
    <GoalsStack.Screen name="GoalScreen" component={GoalScreen} options={{ headerTitle: 'Screen 2 Title' }} />
  </GoalsStack.Navigator>
)

export const SettingsStackScreen = () => (
  <SettingsStack.Navigator screenOptions={{
    headerShown: false
  }}>
    <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen} />
  </SettingsStack.Navigator>
)