import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { formatNumberToCurrency } from '../../Utils/Helpers'
import { FontAwesome5 } from '@expo/vector-icons'

const Container = styled.View`
  padding: 20px;
  /* border-: 1px solid rgba(34, 36, 38, 0.15); */
  border-bottom-color: rgba(34, 36, 38, 0.15);
  border-bottom-width: 1px;
  border-style: solid;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`

const Text = styled.Text`
  font-size: 18px;
  font-weight: bold;
`

type TProps = {
  item: TProduct
  deleteProduct(id: string): void
}

const ProductItem = (props: TProps) => {
  const { item, deleteProduct } = props

  const onPressDeleteProduct = () => {
    deleteProduct(item._id)
  }

  return (
    <Container>
      <View>
        <Text>{item.title}</Text>
        <Text>{formatNumberToCurrency(item.price)}</Text>
      </View>
      <TouchableOpacity onPress={onPressDeleteProduct}>
        <FontAwesome5 name="trash-alt" size={24} color="black" />
      </TouchableOpacity>
    </Container>
  )
}

export default ProductItem
