type TProductsStack = {
  List: undefined
  Form: undefined
}

type TUser = {
  _id: string
  name: string
  email: string
  isMaster: boolean
  tenant: TTenant
  token?: string
  enabled: boolean
  user: TUser
  createdAt: Date
  updatedAt: Date
}

type TProduct = {
  _id: string
  title: string
  boughtBy: TBoughBy
  price: number
  width: number
  enabled: boolean
  user: TUser
  createdAt: Date
  updatedAt: Date
}

type TSort = {
  column: string
  order: 'asc' | 'desc'
}