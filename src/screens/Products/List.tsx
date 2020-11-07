import React, { useLayoutEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { StackNavigationProp } from '@react-navigation/stack'
import styled from 'styled-components/native'

const IconButton = styled.TouchableOpacity`
  margin-right: 15px;
`

type TProps = {
  navigation: StackNavigationProp<TProductsStack>
}

const ProductsListScreen = ({ navigation }: TProps) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Products',
      headerRight: () => (
        <IconButton onPress={() => navigation.navigate('Form')}>
          <Ionicons name="ios-add" size={24} color="#0079ff" />
        </IconButton>
      ),
    })
  }, [navigation])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Products List Screen</Text>
    </View>
  )
}

export default ProductsListScreen
