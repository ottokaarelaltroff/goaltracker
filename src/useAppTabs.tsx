import { Image, StyleSheet, View } from "react-native";
import { Colors } from "./util/Colors";

const calendarIcon = require("./assets/calendar.png");
const goalIcon = require("./assets/goal.png");
const settingIcon = require("./assets/settings.png");

export default function useAppTabs() {

  const getIcon = (file: any) => (
    {
      tabBarIcon: ({ focused }) => (
        <View>
          <Image
            source={file}
            resizeMode="contain"
            style={[styles.tabBarIcon, focused ? styles.tabBarIconSelected : {}]}
          />
        </View>
      )
    }
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

  return {
    getIcon,
    tabBarOptions,
    calendarIcon,
    goalIcon,
    settingIcon
  }

}

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