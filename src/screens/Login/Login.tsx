import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components/native'

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #2185d0;
`

const LoginScreen = () => {
  return (
    <Container>
      <Text>Login Screen</Text>
    </Container>
  )
}

export default LoginScreen
