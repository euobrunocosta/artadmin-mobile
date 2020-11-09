import React, { useLayoutEffect, useState, useEffect } from 'react'
import { FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { StackNavigationProp } from '@react-navigation/stack'
import styled from 'styled-components/native'
import api from '../../Services/Api'
import Item from './Item'

const IconButton = styled.TouchableOpacity`
  margin-right: 15px;
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

  return (
    <FlatList
      data={list}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => {
        return <Item item={item} />
      }}
    />
  )
}

export default ProductsListScreen
