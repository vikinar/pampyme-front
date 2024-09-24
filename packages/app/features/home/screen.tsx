import { Text, useSx, View, H1, TextInput, Pressable } from 'dripsy'
import { Formik } from 'formik'
import * as Yup from 'yup'

export function HomeScreen() {
  const sx = useSx()

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  })

  return (
    <View
      sx={{ flex: 1, justifyContent: 'center', alignItems: 'center', p: 16 }}
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
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              placeholder="Email"
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
            />
            {touched.email && errors.email && (
              <Text sx={{ color: 'red', marginBottom: 8 }}>{errors.email}</Text>
            )}

            <TextInput
              placeholder="Password"
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
              secureTextEntry
            />
            {touched.password && errors.password && (
              <Text sx={{ color: 'red', marginBottom: 8 }}>{errors.password}</Text>
            )}

            <Pressable
              onPress={() => handleSubmit()}
              sx={{
                backgroundColor: '#2628dd',
                padding: 12,
                borderRadius: 4,
                alignItems: 'center',
                width: '100%',
                maxWidth: '300'
              }}
            >
              <Text sx={{ color: 'white', fontWeight: 'bold' }}>Submit</Text>
            </Pressable>
          </>
        )}
      </Formik>
    </View>
  )
}