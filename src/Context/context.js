import React, {createContext} from 'react'

let Context = React.createContext({
  orders: 0,
  menuCategorys: [],
  currentCategory: '',
  isLoading: true,
  error: null,
  updateCategory: () => {},
  addItem: () => {},
  removeItem:()=>{}
})

export default Context
