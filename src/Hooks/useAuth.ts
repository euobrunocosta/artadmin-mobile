import { useState, useEffect } from 'react'
import constate from 'constate'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuth } from '../Services/Api'

const safeKey = '@USER/data'
const registrationKey = '@USER/registration'
const tokenKey = '@USER/token'

function useAuthContext() {
  const [user, setUser] = useState<TUser>()
  const [userToken, setUserToken] = useState('')
  const [registration, setRegistration] = useState('')

  useEffect(() => {
    const getUserData = async () => {
      const rawData = await AsyncStorage.getItem(safeKey)
      if (!rawData) return
  
      const data = JSON.parse(rawData)
      setUser(data)
    }
  
    const getToken = async () => {
      const token = await AsyncStorage.getItem(tokenKey)
      if (!token) return
  
      setUserToken(token)
      setAuth(`Bearer ${token}`)
    }
  
    const getRegistration = async () => {
      const registration = await AsyncStorage.getItem(registrationKey)
      if (!registration) return
  
      setRegistration(registration)
    }
    
    getUserData()
    getToken()
    getRegistration()
  }, [])

  const saveUserData = async (data: TUser) => {
    if (!data.token) return
    const token = data.token
    setUserToken(token)
    delete data.token
    setUser(data)

    await AsyncStorage.setItem(safeKey, JSON.stringify(data))
    await AsyncStorage.setItem(tokenKey, token)
  }

  const signOut = async () => {
    setUser(undefined)
    setUserToken('')
    await AsyncStorage.clear()
  }

  const saveRegistration = async (data: any) => {
    setRegistration(data)
    await AsyncStorage.setItem(registrationKey, data)
  }

  return { user, userToken, registration, saveUserData, saveRegistration, signOut }
}

const [UseAuthProvider, useAuth] = constate(useAuthContext)

export { UseAuthProvider, useAuth }
