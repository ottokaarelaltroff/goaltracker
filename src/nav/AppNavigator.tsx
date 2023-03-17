import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Colors } from '../util/Colors';
import { AuthStackScreen } from './AppStacks';
import { Tabs } from './AppTabs';

const RootStack = createStackNavigator();
const DrawerStack = createDrawerNavigator();

const drawerOptions = {
  headerShown: false,
  drawerStyle: { backgroundColor: Colors.lightGray }
};

const Drawer = () => (
  <DrawerStack.Navigator screenOptions={drawerOptions}>
    <DrawerStack.Screen name="Home" component={Tabs} />
    <DrawerStack.Screen name="Auth" component={AuthStackScreen} />
  </DrawerStack.Navigator>
)

const Root = ({ userToken }) => (
  <RootStack.Navigator screenOptions={{ headerShown: false }}>
    {userToken
      ? <RootStack.Screen name="App" component={Drawer} />
      : <RootStack.Screen name="Auth" component={AuthStackScreen} />}
  </RootStack.Navigator>
)

export const AppNavigator = () => {

  const [userToken, setUserToken] = React.useState("asdf")
  return (
    <NavigationContainer>
      <Root userToken={userToken}></Root>
    </NavigationContainer>
  );
};

