import LanguageSwitcher from 'app/components/LanguageSwitcher'
import { H1, Pressable, Text, TextInput, View, useSx } from 'dripsy'
import { Formik } from 'formik'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import * as Yup from 'yup'

export function HomeScreen() {
  const [isInitialized, setIsInitialized] = useState(false)

  const sx = useSx()
  const keyboardHeight = useRef(new Animated.Value(0)).current // Инициализируем анимированное значение для высоты клавиатуры

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Passwords must match') // Validation to ensure both passwords match
      .required('Confirm your password'),
  })

  const { t } = useTranslation()

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (event) => {
        Animated.timing(keyboardHeight, {
          toValue: event.endCoordinates.height - 300, // Получаем высоту клавиатуры
          duration: 300,
          useNativeDriver: false,
        }).start()
      }
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        Animated.timing(keyboardHeight, {
          toValue: 0, // Возвращаем высоту к 0
          duration: 300,
          useNativeDriver: false,
        }).start()
      }
    )

    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [keyboardHeight])

  const handleDismissKeyboard = () =>
    Platform.OS !== 'web' && Keyboard.dismiss()

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      // keyboardVerticalOffset={0} // Вы можете настроить это значение, если нужно
    >
      <LanguageSwitcher />
      <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
        <Animated.View
          style={{
            flex: 1,
            paddingBottom: keyboardHeight, // Смещение вниз на высоту клавиатуры
          }}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 16,
            }}
            keyboardShouldPersistTaps="handled"
            scrollEnabled={true}
          >
            <H1 sx={{ fontWeight: '800', fontFamily: 'Grapalat Regular' }}>
              PM.
            </H1>
            <Formik
              initialValues={{ email: '', password: '', repeatPassword: '' }}
              validationSchema={validationSchema}
              validateOnChange={false}
              onSubmit={(values) => {
                console.log('email', values.email)
                console.log('password', values.password)
                console.log('repeat password', values.repeatPassword)
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isValid,
              }) => (
                <>
                  <TextInput
                    placeholder={t('email')}
                    placeholderTextColor="rgba(0, 0, 0, 0.7)"
                    sx={{
                      width: '100%',
                      padding: 12,
                      marginBottom: 16,
                      borderWidth: 1,
                      borderColor: 'gray',
                      borderRadius: 4,
                      fontFamily: 'Grapalat Regular',
                      fontSize: 16,
                    }}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    inputMode="email"
                    autoCapitalize="none"
                    autoComplete={'off'}
                    // autoFocus={true}
                  />
                  {touched.email && errors.email && (
                    <Text sx={{ color: 'red', marginBottom: 8 }}>
                      {errors?.email}
                    </Text>
                  )}

                  <TextInput
                    placeholder={t('password')}
                    placeholderTextColor="rgba(0, 0, 0, 0.7)"
                    sx={{
                      width: '100%',
                      padding: 12,
                      marginBottom: 16,
                      borderWidth: 1,
                      borderColor: 'gray',
                      borderRadius: 4,
                      fontFamily: 'Grapalat Regular',
                      fontWeight: '500',
                      fontSize: 16,
                    }}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    inputMode={'text'}
                    autoComplete={'password'}
                    secureTextEntry
                  />
                  {touched.password && errors.password && (
                    <Text sx={{ color: 'red', marginBottom: 8 }}>
                      {errors?.password}
                    </Text>
                  )}

                  <TextInput
                    placeholder={t('repeat_password')}
                    placeholderTextColor="rgba(0, 0, 0, 0.7)"
                    sx={{
                      width: '100%',
                      padding: 12,
                      marginBottom: 16,
                      borderWidth: 1,
                      borderColor: 'gray',
                      borderRadius: 4,
                      // fontFamily: 'Grapalat Regular',
                      fontSize: 16,
                    }}
                    onChangeText={handleChange('repeatPassword')}
                    onBlur={handleBlur('repeatPassword')}
                    value={values.repeatPassword}
                    inputMode={'text'}
                    autoComplete={'off'}
                    secureTextEntry
                  />
                  {touched.repeatPassword && errors.repeatPassword && (
                    <Text sx={{ color: 'red', marginBottom: 8 }}>
                      {errors.repeatPassword}
                    </Text>
                  )}

                  <Pressable
                    // disabled={!isValid}
                    onPress={() => handleSubmit()}
                    sx={{
                      backgroundColor: '#2628dd',
                      padding: 12,
                      borderRadius: 4,
                      alignItems: 'center',
                      width: '100%',
                      maxWidth: '300',
                    }}
                  >
                    <Text sx={{ color: 'white', fontWeight: 'bold' }}>
                      Submit
                    </Text>
                  </Pressable>
                </>
              )}
            </Formik>
          </ScrollView>
        </Animated.View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
