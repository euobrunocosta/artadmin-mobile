import React, { useLayoutEffect, useState, useEffect } from 'react'
import { FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { StackNavigationProp } from '@react-navigation/stack'
import styled from 'styled-components/native'
import api from '../../Services/Api'
import Item from './Item'

const IconButton = styled.TouchableOpacity`
  margin-right: 15px;
`

const LoaderContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const Button = styled.View`
  margin: 10px;
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

type TProps = {
  navigation: StackNavigationProp<TProductsStack>
}

const ProductsListScreen = ({ navigation }: TProps) => {
  const [list, setList] = useState<TProduct[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showLoadMore, setShowLoadMore] = useState(false)
  const [sort, setSort] = useState<TSort>({
    column: 'createdAt',
    order: 'desc',
  })
  const [search, setSearch] = useState('')

  const getData = async (offset?: number, limit?: number) => {
    setIsLoading(true)
    const query: any = {
      limit: limit ?? 10,
      offset: offset ?? 0,
      sort: `${sort.order === 'desc' ? '-' : ''}${sort.column}`,
    }
    if (search !== '') query.search = search
    // if (filterEnable !== null) query.enabled = filterEnable === 'Enabled'
    const response = await api.get('/products', query)
    setIsLoading(false)
    if (!response) return

    setShowLoadMore(response.nextPage)

    if (offset) {
      setList([...list, ...response.data])
    } else {
      setList(response.data)
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Products',
      headerRight: () => (
        <IconButton onPress={() => navigation.navigate('Form')}>
          <Ionicons name="ios-add" size={24} color="white" />
        </IconButton>
      ),
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#0079ff',
      },
    })
  }, [navigation])

  useEffect(() => {
    if (sort.column !== 'createdAt') {
      getData(0, list.length)
    }
  }, [sort])

  useEffect(() => {
    getData()
  }, [search])

  const onPressLoadMore = async () => {
    await getData(list.length)
  }

  const deleteProduct = async (id: string) => {
    const response = await api.delete(`/products/${id}`)
    if (!response) return
    const _list = list.filter((item) => item._id !== id)
    setList(_list)
  }

  return (
    <>
      {isLoading ? (
        <LoaderContainer>
          <ActivityIndicator size="large" color="#2185d0" />
        </LoaderContainer>
      ) : (
        <FlatList
          data={list}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return <Item item={item} deleteProduct={deleteProduct} />
          }}
        />
      )}
      {showLoadMore && (
        <TouchableOpacity onPress={onPressLoadMore} disabled={isLoading}>
          <Button>
            <ButtonText>Load more</ButtonText>
          </Button>
        </TouchableOpacity>
      )}
    </>
  )
}

export default ProductsListScreen
