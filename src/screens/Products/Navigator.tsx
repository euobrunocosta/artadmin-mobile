import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProductsList from './List'
import ProductsForm from './Form'

const Stack = createStackNavigator()

const ProductsNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="List" component={ProductsList} />
    <Stack.Screen name="Form" component={ProductsForm} />
  </Stack.Navigator>
)

export default ProductsNavigator
