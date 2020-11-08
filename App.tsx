import * as React from 'react'
import Auth from './src/Auth'
import Providers from './src/Providers/Providers'

export default function App() {
  return (
    <Providers>
      <Auth />
    </Providers>
  )
}
