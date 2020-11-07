import React from 'react'
import { useAuth } from './Hooks/useAuth'
import MainNavigator from './MainNavigator'
import LoginScreen from './Screens/Login/Login'

const Auth = () => {
  const { userToken } = useAuth()

  if (userToken) {
    return <MainNavigator />
  }
  return <LoginScreen />
}

export default Auth
