import * as React from 'react';
import { AppNavigator } from './src/nav/AppNavigator';
import GlobalProvider from './src/context/providers/GlobalProvider';

export default function App() {
  return (
    <GlobalProvider>
      <AppNavigator></AppNavigator>
    </GlobalProvider>
  );
};
