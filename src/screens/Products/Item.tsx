import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { formatNumberToCurrency } from '../../Utils/Helpers'

const Container = styled.View`
  padding: 20px;
  /* border-: 1px solid rgba(34, 36, 38, 0.15); */
  border-bottom-color: rgba(34, 36, 38, 0.15);
  border-bottom-width: 1px;
  border-style: solid;
  justify-content: space-between;
  flex-direction: row;
`

const Text = styled.Text`
  font-size: 18px;
  font-weight: bold;
`

type TProps = {
  item: TProduct
}

const ProductItem = (props: TProps) => {
  const { item } = props

  return (
    <Container>
      <Text>{item.title}</Text>
      <Text>{formatNumberToCurrency(item.price)}</Text>
    </Container>
  )
}

export default ProductItem
