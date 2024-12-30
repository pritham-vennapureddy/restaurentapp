import TitleBar from '../TitleBar'
import MenuBar from '../MenuBar'

import {Component} from 'react'
import Context from '../../Context/context.js'
import EachDish from '../EachDish'

class Home extends Component {
  render() {
    return (
      <Context.Consumer>
        {value => {
          const {menuCategorys, currentCategory, isLoading, error} = value
          if (isLoading) {
            return <p>....Loading</p>
          }
          if (error) {
            return <p>{error}</p>
          }
          console.log(menuCategorys)
          const dishcategory = menuCategorys.filter(
            each => each.menu_category === currentCategory,
          )
          console.log(dishcategory)
          let dishItems = dishcategory[0].category_dishes
          return (
            <>
              <TitleBar />
              <MenuBar />
              <ul>
                {dishItems.map(each => (
                  <EachDish dishDetails={each} />
                ))}
              </ul>
            </>
          )
        }}
      </Context.Consumer>
    )
  }
}
export default Home
