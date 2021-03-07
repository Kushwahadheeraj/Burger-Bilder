import React, {Component} from 'react';
import {Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import CheckoutSummary from '../../BurgerComponents/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';
//import * as actions from '../../Store/actions/index'
class Checkout extends Component{
checkoutCancaledHandler=()=>{
    this.props.history.goBack();
}
checkoutContinuedHandler=()=>{
    this.props.history.replace('/checkout/contact-data')
}
      render(){
          let summary =<Redirect to="/"/>
          if(this.props.ings){
              const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
              summary=(
                <div> 
                    {purchasedRedirect}
                <CheckoutSummary
                      ingredient={this.props.ings}
                      checkoutCancaled={this.checkoutCancaledHandler}
                      checkoutContinued={this.checkoutContinuedHandler} />
                      <Route path={this.props.match.path + '/contact-data'}
                          component={ContactData} />  
                 </div>
              );
          }
          return summary;
        }
    }
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredient,
        purchased:state.order.purchased
        // price: state.totalPrice
    };
}
    export default connect(mapStateToProps) (Checkout);