import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Auth from './src/Auth'
import Providers from './src/Providers/Providers'

export default function App() {
  return (
    <Providers>
      <Auth />
    </Providers>
  )
}
