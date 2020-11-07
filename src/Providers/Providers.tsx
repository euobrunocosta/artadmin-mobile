import React, { ReactNode } from 'react'
import { UseAuthProvider } from '../Hooks/useAuth'

interface IProps {
  children: ReactNode
}

const Providers = ({ children }: IProps) => {
  return <UseAuthProvider>{children}</UseAuthProvider>
}

export default Providers
