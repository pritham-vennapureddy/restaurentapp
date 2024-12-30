import {Component} from 'react'
import Context from '../../Context/context.js'
import './index.css'

class EachDish extends Component {
  render() {
    return (
      <Context.Consumer>
        {value => {
          const {dishDetails} = this.props
          const {orders, removeItem, addItem} = value
          const {
            dish_id,
            dish_name,
            dish_price,
            dish_image,
            dish_currency,
            dish_calories,
            dish_description,
            dish_Availability,
            dish_Type,
            addonCat,
          } = dishDetails
          let decreasebtn = () => {
            removeItem(dish_id)
          }
          let increasebtn = () => {
            addItem(dish_id)
          }
          let object1 = orders.find(each => each.dishId === dish_id)
          const quantity = object1?.quantity || 0
          return (
            <li className='listTMenu'>
              <div className='listType'>
                <div className='section1'>
                  <div>
                    <img
                      className='dishTypeLogo'
                      src={
                        dish_Type === 1
                          ? 'https://www.kindpng.com/picc/m/151-1515163_100-veg-logo-png-transparent-png.png'
                          : 'https://www.pngkey.com/png/full/245-2459071_non-veg-icon-non-veg-symbol-png.png'
                      }
                    />
                  </div>
                  <div>
                    <h1 className='dishName'>{dish_name}</h1>
                    <p className='dishCurrency'>
                      {dish_currency} {dish_price}
                    </p>
                    <p className='dishDescription'>{dish_description}</p>
                    <div className='buttonContainer'>
                      <button className='buttonapply' onClick={decreasebtn}>
                        -
                      </button>
                      <p className='counter'>{quantity}</p>
                      <button onClick={increasebtn} className='buttonapply'>
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className='container'>
                  <p className='calories'>{dish_calories} calories</p>
                  <img className='dishImage' src={dish_image} />
                </div>
              </div>
            </li>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default EachDish
