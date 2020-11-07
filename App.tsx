import * as React from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ProductsScreen from './src/screens/Products/List'
import ClientsScreen from './src/screens/Clients/List'
import OrdersScreen from './src/screens/Orders/List'
import { AntDesign, Octicons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            switch (route.name) {
              case 'Orders':
                return <Octicons name="package" size={24} color={color} />
              case 'Products':
                return <AntDesign name="shoppingcart" size={24} color={color} />
              case 'Clients':
                return <AntDesign name="contacts" size={24} color={color} />
            }
          },
        })}
      >
        <Tab.Screen name="Orders" component={OrdersScreen} />
        <Tab.Screen name="Products" component={ProductsScreen} />
        <Tab.Screen name="Clients" component={ClientsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
