// In App.js in a new project

import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppStack from './AppStack';
import AuthenticationStack from './AuthenticationStack';
import {NavigationContainer} from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { isAuthenticatedUser } from '../atom/authtication';

function Navigation() {
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(isAuthenticatedUser)

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthenticationStack />}
    </NavigationContainer>
  );
}

export default Navigation;
