import {Component} from 'react'
import Context from '../../Context/context.js'
import {Link} from 'react-router-dom'
import './index.css'

class MenuBar extends Component {
  render() {
    return (
      <Context.Consumer>
        {value => {
          const {
            menuCategorys,
            updateCategory,
            currentCategory,
            isLoading,
            error,
          } = value
          if (isLoading) {
            return <div>Loading...</div>
          }

          if (error) {
            return <div>{error}</div>
          }

          return (
            <ul className="unordermenu">
              {menuCategorys.map(each => (
                <li
                  className={
                    currentCategory === each.menu_category
                      ? 'activecolorlistmenu'
                      : 'listmenu'
                  }
                  key={each.menu_category_id}
                  onClick={() => updateCategory(each.menu_category)}
                >
                  {each.menu_category}
                  {currentCategory === each.menu_category ? (
                    <hr className={'activecolor2menu'} />
                  ) : (
                    ''
                  )}
                </li>
              ))}
            </ul>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default MenuBar
