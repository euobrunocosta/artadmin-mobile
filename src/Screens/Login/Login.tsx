import React, { useState } from 'react'
import styled from 'styled-components/native'
import SvgUri from 'expo-svg-uri'
import { AntDesign, Feather } from '@expo/vector-icons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity, ActivityIndicator } from 'react-native'
import { useAuth } from '../../Hooks/useAuth'
import api, { setAuth } from '../../Services/Api'

const Box = styled.View`
  width: 300px;
  align-items: center;
  align-self: center;
`

const FormContainer = styled.View`
  background-color: white;
  width: 300px;
  padding: 10px;
  border-radius: 5px;
`

const Title = styled.Text`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`
const FieldView = styled.View`
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 5px;
  height: 45px;
  margin-bottom: 10px;
  flex-direction: row;
`

const AntDesignIcon = styled(AntDesign)`
  margin: 10px;
  color: rgba(34, 36, 38, 0.15);
`

const FeatherIcon = styled(Feather)`
  margin: 10px;
  color: rgba(34, 36, 38, 0.15);
`

const Button = styled.View`
  border-radius: 5px;
  border: 1px solid #2185d0;
  height: 45px;
  align-items: center;
  justify-content: center;
`

const ButtonText = styled.Text`
  color: #2185d0;
  line-height: 45px;
  font-weight: bold;
  font-size: 16px;
`

const Input = styled.TextInput`
  flex: 1;
`

const ScrollView = styled(KeyboardAwareScrollView)`
  background-color: #2185d0;
`

const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { saveUserData } = useAuth()

  const toggleShowPassword = () => setShowPassword(!showPassword)

  const onChangeEmail = (text: string) => {
    setEmail(text)
  }

  const onChangePassword = (text: string) => {
    setPassword(text)
  }

  const onPressSend = async (_: any) => {
    setIsLoading(true)
    const response = await api.post('/users/authenticate', { email, password })
    setIsLoading(false)
    if (!response) return
    setAuth(`Bearer ${response.token}`)
    saveUserData(response)
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
    >
      <Box>
        <SvgUri
          width={250}
          height={100}
          source={require('../../Assets/logo-extended.svg')}
        />
        <FormContainer>
          <Title>Sign In</Title>
          <FieldView>
            <AntDesignIcon name="user" size={25} />
            <Input
              autoCapitalize="none"
              value={email}
              keyboardType="email-address"
              onChangeText={onChangeEmail}
            />
          </FieldView>
          <FieldView>
            <AntDesignIcon name="lock" size={25} />
            <Input
              value={password}
              secureTextEntry={!showPassword}
              onChangeText={onChangePassword}
            />
            <FeatherIcon
              name={showPassword ? 'eye-off' : 'eye'}
              size={25}
              onPress={toggleShowPassword}
            />
          </FieldView>
          <TouchableOpacity onPress={onPressSend} disabled={isLoading}>
            <Button>
              {isLoading ? (
                <ActivityIndicator size="small" color="#2185d0" />
              ) : (
                <ButtonText>Send</ButtonText>
              )}
            </Button>
          </TouchableOpacity>
        </FormContainer>
      </Box>
    </ScrollView>
  )
}

export default LoginScreen
