import { Image, StyleSheet, View } from "react-native";
import { Colors } from "../util/Colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GoalStackScreen, HabitsStackScreen, SettingsStackScreen } from "./AppStacks";

const calendarIcon = require("../assets/calendar.png");
const goalIcon = require("../assets/goal.png");
const settingIcon = require("../assets/settings.png");

const TabStack = createBottomTabNavigator();

export const Tabs = () => (
  <TabStack.Navigator screenOptions={tabBarOptions} initialRouteName='Goals'>
    <TabStack.Screen name="Habits" component={HabitsStackScreen} options={getTabOptions(calendarIcon)} />
    <TabStack.Screen name="Goals" component={GoalStackScreen} options={getTabOptions(goalIcon)} />
    <TabStack.Screen name="Settings" component={SettingsStackScreen} options={getTabOptions(settingIcon)} />
  </TabStack.Navigator>
);

const tabBarOptions = {
  tabBarActiveTintColor: Colors.orange,
  tabBarInactiveTintColor: Colors.lightGray,
  tabBarStyle: {
    backgroundColor: Colors.secondary
  },
  headerStyle: {
    backgroundColor: Colors.secondary
  },
  headerTintColor: Colors.white,
};


const getTabOptions = (icon: any) => (
  {
    tabBarIcon: ({ focused }) => (
      <View>
        <Image
          source={icon}
          resizeMode="contain"
          style={[styles.tabBarIcon, focused ? styles.tabBarIconSelected : {}]}
        />
      </View>
    )
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