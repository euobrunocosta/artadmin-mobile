import * as React from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ProductsScreen from './src/screens/Products/List'
import ClientsScreen from './src/screens/Clients/List'

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Products" component={ProductsScreen} />
        <Tab.Screen name="Clients" component={ClientsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
