import React from 'react'
import { View, Text, Button } from 'react-native'
import { useAuth } from '../../Hooks/useAuth'

const OrdersListScreen = () => {
  const { signOut } = useAuth()
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Orders List Screen</Text>
      <Button title="Log out" onPress={signOut} />
    </View>
  )
}

export default OrdersListScreen
