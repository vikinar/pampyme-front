import LanguageSwitcher from 'app/components/shared/LanguageSwitcher'
import { BaseButton } from 'app/ui/Buttons/BaseButton/BaseButton'
import BaseInput from 'app/ui/Inputs/BaseInput'
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
  const sx = useSx()
  const keyboardHeight = useRef(new Animated.Value(0)).current // Инициализируем анимированное значение для высоты клавиатуры

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Passwords must match')
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
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0} // Вы можете настроить это значение, если нужно
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
                  <BaseInput
                    name={'email'}
                    placeholder={t('email')}
                    value={values.email}
                    onChange={handleChange('email')}
                    onBlur={handleBlur('email')}
                    error={errors?.email}
                    touched={touched.email}
                  />

                  <BaseInput
                    name={'password'}
                    placeholder={t('password')}
                    value={values.password}
                    onChange={handleChange('password')}
                    onBlur={handleBlur('password')}
                    error={errors?.password}
                    touched={touched.password}
                  />

                  <BaseInput
                    name={'repeat_password'}
                    placeholder={t('repeat_password')}
                    value={values.repeatPassword}
                    onChange={handleChange('repeat_password')}
                    onBlur={handleBlur('repeat_password')}
                    error={errors?.repeatPassword}
                    touched={touched.repeatPassword}
                  />

                  <BaseButton
                    disabled={!isValid}
                    onClick={handleSubmit}
                    text={'Submit'}
                  />
                </>
              )}
            </Formik>
          </ScrollView>
        </Animated.View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
