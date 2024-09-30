import { H1, Pressable, Text, TextInput, useSx } from 'dripsy'
import { Formik } from 'formik'
import { useEffect, useRef } from 'react'
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
  const sx = useSx()
  const keyboardHeight = useRef(new Animated.Value(0)).current // Инициализируем анимированное значение для высоты клавиатуры

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
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

  const handleDismissKeyboard = () => Keyboard.dismiss()

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0} // Вы можете настроить это значение, если нужно
    >
      <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
        <Animated.View // Используем Animated.View для плавной анимации
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
            <H1 sx={{ fontWeight: '800' }}>PM.</H1>
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log('email', values.email)
                console.log('password', values.password)
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
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
                    }}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete={'off'}
                    autoFocus={true}
                  />
                  {touched.email && errors.email && (
                    <Text sx={{ color: 'red', marginBottom: 8 }}>
                      {errors.email}
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
                    }}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    keyboardType={'visible-password'}
                    autoComplete={'password'}
                    secureTextEntry
                  />
                  {touched.password && errors.password && (
                    <Text sx={{ color: 'red', marginBottom: 8 }}>
                      {errors.password}
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
                    }}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    keyboardType={'visible-password'}
                    autoComplete={'password'}
                    secureTextEntry
                  />
                  {touched.password && errors.password && (
                    <Text sx={{ color: 'red', marginBottom: 8 }}>
                      {errors.password}
                    </Text>
                  )}

                  <Pressable
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
