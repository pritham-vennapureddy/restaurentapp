import {Component} from 'react'
import Context from '../../Context/context.js'
import './index.css'
import {BiCart} from 'react-icons/bi'

class TitleBar extends Component {
  render() {
    return (
      <Context.Consumer>
        {value => {
          const {orders} = value
          return (
            <nav className="navbar">
              <h1 className="titleOfCafe">UNI Resto Cafe</h1>
              <div className="cartContainer">
                <p className="cartDescribtion">My Orders</p>
                <div>
                  <div className="iconContainer">
                    <BiCart size={40} />
                  </div>
                  <span className="cartReader">
                    {orders.length > 0 ? orders.length : 0}
                  </span>
                </div>
              </div>
            </nav>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default TitleBar
