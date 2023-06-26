import {
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  TouchableWithoutFeedback,Keyboard, Alert,ScrollView
} from 'react-native';
import React, {useState, useRef} from 'react';
import {width, height, Color, Font, Size} from '../utils/constant';
import {TextInput} from 'react-native-paper';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useRecoilState } from 'recoil';
import { isAuthenticatedUser, userInformation } from '../atom/authtication';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email*').required('Required*').trim(),
  password: Yup.string()
    .min(6, 'Password must have at least 6 characters!')
    .required('Password is required'),
});
const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
const [isAuthenticated, setIsAuthenticated] = useRecoilState(isAuthenticatedUser)
const [user, setUser] = useRecoilState(userInformation)
  const [passwordVisible, setPasswordVisible] = useState(true);
  const password = useRef(null);
  const {handleChange, handleBlur, handleSubmit, values, errors, touched} =
    useFormik({
      validationSchema: LoginSchema,
      initialValues: {
        email: 'mood10@yopmail.com',
        password: '123456',
      },
      onSubmit: async values => {
        console.log('values:', values);
        setLoading(true);
        try {
          const api = `https://api.moodstrap.store:5000/user/login`;
          const response = await fetch(api, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });

          const data = await response.json();
          console.log('data:', data)
          setUser(data)
          const status = response.status;

          if (status === 200) {
          
            await AsyncStorage.setItem('user', JSON.stringify(data));
            setIsAuthenticated(()=> true);
          }
        } catch (error) {
          Alert.alert('Alert', "InternetFailed")
        } finally {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      },
    });
  return (
    <ScrollView style={styles.container}>
      <TouchableWithoutFeedback
        style={{flex: 1}}
        onPress={loading ? null : Keyboard.dismiss}
        disabled={loading}>
        <>

        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/logo/logo.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Welcome back!</Text>
        </View>
        <View style={styles.TextInputContainer}>
          <Text style={styles.label}>E-mail address</Text>
          <TextInput
            value={values.email}
            right={
              <TextInput.Icon
                icon="email-outline"
                iconColor={Color.secondary}
              />
            }
            placeholder="Enter your email"
            autoCapitalize="none"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            error={errors.email}
            touched={touched.email}
            style={styles.input}
            underlineColor={Color.ligth}
          />
          <Text style={styles.label}>Password</Text>

          <TextInput
            value={values.password}
            right={
              <TextInput.Icon
                icon={passwordVisible ? 'eye' : 'eye-off'}
                onPress={() => setPasswordVisible(!passwordVisible)}
              />
            }
            placeholder="Enter your password"
            secureTextEntry={passwordVisible}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            error={errors.password}
            touched={touched.password}
            style={styles.input}
            ref={password}
            underlineColor={Color.ligth}
          />
        </View>
        <View style={styles.forgetPasswordContainer}>
          <Text style={styles.forgetPassword}>Forgot password?</Text>
        </View>
        <View style={styles.orSocialMediaContainer}>
          <View style={styles.box}>
            <Text numberOfLines={1} ellipsizeMode="clip" style={styles.lines}>
              _____________________________
            </Text>
          </View>
          <View>
            <Text style={styles.orSocialMedia}>or</Text>
          </View>
          <View style={styles.box}>
            <Text numberOfLines={1} ellipsizeMode="clip" style={styles.lines}>
              _________________________________
            </Text>
          </View>
        </View>
        <View style={styles.socialMediaContainer}>
          <TouchableOpacity style={styles.logoContainer}>
            <Image
              source={require('../../assets/logo/Google/Google.png')}
              style={styles.logo}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoContainer}>
            <Image
              source={require('../../assets/logo/facebook/facebook.png')}
              style={styles.logo}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoContainer}>
            <Image
              source={require('../../assets/logo/apple-logo/apple-logo.png')}
              style={styles.logo}
            />
          </TouchableOpacity>
        </View>

        <Pressable style={styles.submitContainer} onPress={handleSubmit}>
          <Text style={styles.submit}>LOGIN</Text>
          <AntDesign size={25} color={Color.ligth} name="arrowright" />
        </Pressable>
        <View style={styles.dontHaveAccountContainer}>
          <Text style={styles.dontHaveAccount}>
            Don't have and account?
            <Text style={styles.register}>Sign up now</Text>
          </Text>
        </View>
        </>

      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Color.ligth},
  imageContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: height / 10.7,
  },
  image: {width: width / 1.3, aspectRatio: 1},
  titleContainer: {marginTop: '8%'},
  title: {
    textAlign: 'center',
    fontSize: Size.xxl,
    color: Color.primary,
    fontFamily: Font.bold,
  },
  TextInputContainer: {marginHorizontal: '5%', marginTop: '5%'},
  label: {fontSize: Size.l, color: Color.label, fontFamily: Font.medium},
  input: {
    marginVertical: 5,
    backgroundColor: Color.white,
    borderColor: Color.secondary,
    borderWidth: 1,
    borderRadius: 5,
  },
  forgetPasswordContainer: {
    alignSelf: 'center',
    width: width,
    marginRight: '12%',
  },

  forgetPassword: {
    textAlign: 'right',
    fontFamily: Font.regular,
    fontSize: Font.l,
    color: Color.primary,
    textDecorationLine: 'underline',
  },
  orSocialMediaContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  box: {width: '45%'},
  lines: {
    color: Color.label,
  },
  orSocialMedia: {
    fontSize: Size.xl,
    marginHorizontal: '3%',
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    letterSpacing: 1.1,
    color: Color.label,
  },
  socialMediaContainer: {
    flexDirection: 'row',
    width: '80%',
    marginTop: 20,
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  logoContainer: {
    borderWidth: 1,
    padding: '8%',
    backgroundColor: '#DFE4F8',
    borderColor: '#DFE4F8',
    borderRadius: 10,
  },
  logo: {width: width / 12, aspectRatio: 1},
  submitContainer: {
    width: '90%',
    alignSelf: 'center',
    padding: '5%',
    backgroundColor: Color.primary,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '3%',
  },
  dontHaveAccountContainer: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'flex-end',
    marginTop: '2%',
  },
  submit: {
    color: Color.ligth,
    marginRight: '4%',
    fontFamily: Font.medium,
    fontSize: Size.xl,
  },
  dontHaveAccount: {},
  register: {
    color: Color.secondary,
  },
});
