import { createStackNavigator } from "@react-navigation/stack";
import { Colors } from "../util/Colors";
import { AuthScreen } from "../screens/auth/AuthScreen";
import { SignIn } from "../screens/auth/SignIn";
import { CreateAccount } from "../screens/auth/CreateAccount";
import { HabitsScreen } from "../screens/HabitsScreen";
import { GoalsScreen } from "../screens/GoalsScreen";
import { SettingsScreen } from "../screens/SettingsScreen";

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
    <AuthStack.Screen name="SignIn" component={SignIn} options={{ title: "Sign In" }} />
    <AuthStack.Screen name="CreateAccount" component={CreateAccount} options={{ title: "Create an Account" }} />
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
    <GoalsStack.Screen name="GoalsScreen" component={GoalsScreen} />
  </GoalsStack.Navigator>
)

export const SettingsStackScreen = () => (
  <SettingsStack.Navigator screenOptions={{
    headerShown: false
  }}>
    <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen} />
  </SettingsStack.Navigator>
)