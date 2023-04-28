import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Colors } from '../util/Colors';
import { AuthStackScreen } from './AppStacks';
import { Tabs } from './AppTabs';
import useUser from '../features/auth/useUser';
import { User } from '../model/types';
import useStorage from '../storage/useStorage';
import useAuth from '../features/auth/useAuth';

const RootStack = createStackNavigator();
const DrawerStack = createDrawerNavigator();

interface RootProps {
  user: User
}

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

const Root = ({ user }: RootProps) => (
  <RootStack.Navigator screenOptions={{ headerShown: false }}>
    {user && user.id
      ? <RootStack.Screen name="App" component={Drawer} />
      : <RootStack.Screen name="Auth" component={AuthStackScreen} />}
  </RootStack.Navigator>
)

export const AppNavigator = () => {

  const { user } = useUser();
  const { autoLogin } = useAuth();

  autoLogin();

  return (
    <NavigationContainer>
      <Root user={user}></Root>
    </NavigationContainer>
  );
};

