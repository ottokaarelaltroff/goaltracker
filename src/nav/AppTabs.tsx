import { Image, StyleSheet, View } from "react-native";
import { Colors } from "../util/Colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GoalStackScreen, HabitsStackScreen, SettingsStackScreen } from "./AppStacks";
import { HeaderTitle } from '@react-navigation/elements'

const calendarIcon = require("../assets/calendar.png");
const goalIcon = require("../assets/goal.png");
const settingIcon = require("../assets/settings.png");

const TabStack = createBottomTabNavigator();

export const Tabs = () => (
  <TabStack.Navigator screenOptions={options} initialRouteName='Goals'>
    <TabStack.Screen name="Habits" component={HabitsStackScreen} options={getOptions('My Habits', calendarIcon)} />
    <TabStack.Screen name="Goals" component={GoalStackScreen} options={getOptions('My Goals', goalIcon)} />
    <TabStack.Screen name="Settings" component={SettingsStackScreen} options={getOptions('Settings', settingIcon)} />
  </TabStack.Navigator>
);

const options = {
  tabBarActiveTintColor: Colors.orange,
  tabBarInactiveTintColor: Colors.lightGray,
  tabBarStyle: {
    backgroundColor: Colors.secondary,
    height: 80,
  },
  headerStyle: {
    backgroundColor: Colors.primary,
    height: 150,
    borderBottomWidth: 0,
    borderBottomColor: 'transparent',
  },
  headerTitleAlign: 'left',
  headerTitleStyle: {
    fontSize: 32,
    color: Colors.lightGray
  },
  headerTitleContainerStyle: {
    marginLeft: 30,
  },
};


const getOptions = (title, icon: any) => (
  {
    tabBarIcon: ({ focused }) => (
      <View>
        <Image
          source={icon}
          resizeMode="contain"
          style={[styles.tabBarIcon, focused ? styles.tabBarIconSelected : {}]}
        />
      </View>
    ),
    headerTitle: (props: any) => <HeaderTitle {...props}>{title}</HeaderTitle>,
  }
);

const styles = StyleSheet.create({
  tabBarIcon: {
    width: 30,
    height: 30,
    tintColor: Colors.lightGray
  },
  tabBarIconSelected: {
    tintColor: Colors.orange
  },
});