import { StatusBar, SafeAreaView, Platform } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from '../../features/home/screen'
import { UserDetailScreen } from '../../features/user/detail-screen'

const Stack = createNativeStackNavigator<{
  home: undefined
  'user-detail': {
    id: string
  }
}>()

export function NativeNavigation() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'light-content' : 'default'}
        translucent={false}
        backgroundColor="white"
        hidden={false}
      />
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{
            title: 'Home',
            headerShown: false,
            // statusBarHidden: false, // Эти опции не являются стандартными для react-navigation
            // statusBarStyle: 'auto',
            // statusBarColor: 'darkblue',
            // statusBarAnimation: 'slide',
            // headerBackVisible: true,
            // headerBackButtonMenuEnabled: true,
            // headerBlurEffect: 'dark',
            // headerStyle: {
            //   backgroundColor: 'black', // Фон заголовка
            // },
            // headerTintColor: '#007aff', // Цвет кнопки назад
          }}
        />
        <Stack.Screen
          name="user-detail"
          component={UserDetailScreen}
          options={{
            title: 'User',
          }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  )
}
