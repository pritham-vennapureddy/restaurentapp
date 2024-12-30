import './App.css'
import {Switch, BrowserRouter, Route} from 'react-router-dom'
import {Component} from 'react'
import Home from './components/Home'
import Context from './Context/context.js'
import TitleBar from './components/TitleBar'

class App extends Component {
  state = {
    orders: [],
    menuCategorys: [],
    currentCategory: '',
    isLoading: true,
    error: null,
  }
  componentDidMount() {
    this.getDetailsCategory()
  }
  getDetailsCategory = async () => {
    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    try {
      const response = await fetch(url)
      console.log(response)
      const data = await response.json()
      console.log(data)
      console.log(data[0].table_menu_list)
      console.log(data[0].table_menu_list[0].menu_category)
      if (data[0].table_menu_list) {
        this.setState({
          menuCategorys: data[0].table_menu_list,
          currentCategory: data[0].table_menu_list[0].menu_category,
          isLoading: false,
        })
      } else {
        this.setState({
          error: 'Failed to load menu categories.',
          isLoading: false,
        })
      }
    } catch (error) {
      this.setState({
        error: 'An error occurred while fetching menu categories.',
        isLoading: false,
      })
    }
  }
  updateCategory = item => {
    this.setState({currentCategory: item})
  }
  addItem = item => {
    const {orders} = this.state
    let itemIndex = orders.findIndex(order => order.dishId === item)
    if (itemIndex === -1) {
      let obj = {
        dishId: item,
        quantity: 1,
      }
      this.setState(prev => ({orders: [...prev.orders, obj]}))
    } else {
      const {orders} = this.state
      let oldarr = orders.map((order, index) => {
        if (itemIndex === index) {
          return {
            ...order,
            quantity: order.quantity + 1,
          }
        }
        return order
      })
      this.setState({
        orders: oldarr,
      })
    }
  }
  removeItem = item => {
    const {orders} = this.state

    const itemIndex = orders.findIndex(order => order.dishId === item)

    if (itemIndex === -1) {
      // If the item does not exist, no changes are needed
      return
    }

    const updatedOrders = orders
      .map((order, index) => {
        if (index === itemIndex) {
          // Decrease the quantity for the matching item
          return {
            ...order,
            quantity: order.quantity - 1,
          }
        }
        return order
      })
      .filter(order => order.quantity > 0) // Remove items with quantity 0

    this.setState({orders: updatedOrders})
  }
  render() {
    let {orders, menuCategorys, currentCategory, isLoading, error} = this.state
    return (
      <Context.Provider
        value={{
          orders,
          currentCategory,
          menuCategorys,
          isLoading,
          error,
          updateCategory: this.updateCategory,
          removeItem: this.removeItem,
          addItem: this.addItem,
        }}
      >
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Context.Provider>
    )
  }
}

export default App
