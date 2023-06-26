import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import {useRecoilState, useRecoilValue} from 'recoil';
import {isAuthenticatedUser, userInformation} from '../atom/authtication';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const [user, setUser] = useRecoilState(userInformation)
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(isAuthenticatedUser)
  const logOut  = async() => {
    
     await AsyncStorage.clear()
     setIsAuthenticated(()=> false)
     setUser(()=> {}) 
  }
  return (
    <View style={styles.container}>

      <Text>HomeScreen</Text>

      <Text>firstname : {user.firstname}</Text>
      <Text>lastname : {user.lastname}</Text>
      <Text>email : {user.email}</Text>


      <Button mode='contained'  style={{marginTop:50}} onPress={logOut}>sign out</Button>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignContent: 'center', alignItems:'center'},
});
