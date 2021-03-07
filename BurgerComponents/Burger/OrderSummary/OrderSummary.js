import React from 'react'
import { Component } from 'react';
import Auxiliary from '../../../BurgerHoc/Auxiliary';
import Button from '../../UI/Button/Button'
import "./OrderSummary.css"
class OrderSummary extends Component{
      render(){
          const ingredientSummary = Object.keys(this.props.ingredient)
              .map(igKey => {
                  return <li key={igKey}>
                      <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
                      {this.props.ingredient[igKey]}
                  </li>
              });
          return(
              <Auxiliary>
                  <h3>Your Order</h3>
                  <p>A delicious burger with the following ingredient!</p>
                  <ul>
                      {ingredientSummary}
                  </ul>
                  <p><strong>Total Price:{this.props.price}</strong> RS</p>
                  <p>Continue to Checkout?</p>
                  <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                  <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
              </Auxiliary>
          )
      }  

}
export default OrderSummary;