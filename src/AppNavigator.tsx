import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { GoalsScreen } from './screens/GoalsScreen';
import { HabitsScreen } from './screens/HabitsScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import useAppTabs from './useAppTabs';

const Tabs = createBottomTabNavigator();
const HabitsStack = createStackNavigator();
const GoalsStack = createStackNavigator();
const SettingsStack = createStackNavigator();

const HabitsStackScreen = () => (
  <HabitsStack.Navigator screenOptions={{
    headerShown: false
  }}>
    <HabitsStack.Screen name="HabitsScreen" component={HabitsScreen} />
  </HabitsStack.Navigator>
)

const GoalStackScreen = () => (
  <GoalsStack.Navigator screenOptions={{
    headerShown: false
  }}>
    <GoalsStack.Screen name="GoalsScreen" component={GoalsScreen} />
  </GoalsStack.Navigator>
)

const SettingsStackScreen = () => (
  <SettingsStack.Navigator screenOptions={{
    headerShown: false
  }}>
    <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen} />
  </SettingsStack.Navigator>
)

export const AppNavigator = () => {
  const { tabBarOptions, getIcon, calendarIcon, goalIcon, settingIcon } = useAppTabs();

  return (
    <NavigationContainer>
      <Tabs.Navigator screenOptions={tabBarOptions} >
        <Tabs.Screen name="Habits" component={HabitsStackScreen} options={getIcon(calendarIcon)} />
        <Tabs.Screen name="Goals" component={GoalStackScreen} options={getIcon(goalIcon)} />
        <Tabs.Screen name="Settings" component={SettingsStackScreen} options={getIcon(settingIcon)} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

