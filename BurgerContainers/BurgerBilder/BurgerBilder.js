import React, {Component} from 'react';
import {connect} from 'react-redux';

import Auxiliary from '../../BurgerHoc/Auxiliary';
import Burger from '../../BurgerComponents/Burger/Burger';
import BuildControls from '../../BurgerComponents/Burger/BuildControls/BuildControls';
import Modal from '../../BurgerComponents/UI/Model/Modal';
import OrderSummary from '../../BurgerComponents/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import withErrorHandler from '../../BurgerHoc/withErrorHandler/withErrorHandler'
import Spinner from '../../BurgerComponents/UI/Spinner/Spinner';
import * as actions from '../../Store/actions/index';


class BurgerBilder extends Component{
  
    state={
         parchasing:false
    }
    componentDidMount(){  
        this.props.onInitIngredient();
    }
    updatePurchaseState(ingredient) {
        const sum = Object.keys(ingredient)
            .map(igKey => {
                return ingredient[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }
purchaseHandler=()=>{
    if(this.props.isAuthenticated){
       this.setState({parchasing:true});
    }else{
        this.props.onSetAuthRedirectPath('/checkout');
        this.props.history.push('/auth');
    }
}
purchaseCancelHandler=()=>{
    this.setState({parchasing:false});
}
purchaseContinueHandler=()=>{
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
}
  render(){
         const disabledInfo={
             ...this.props.ings
            };

         for(let key in disabledInfo){
             disabledInfo[key]=disabledInfo[key]<=0
         }  
         let orderSummary=null;
         let burger=this.props.error ? <p>Ingredient con't be loaded!</p>:<Spinner/>;
 
          if (this.props.ings){ 
         burger =(
          <Auxiliary>
             <Burger ingredient={this.props.ings}/>
                  <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler}
                    isAuth={this.props.isAuthenticated}
                    price={this.props.price}
                  />
          </Auxiliary>
         );
                 orderSummary = <OrderSummary 
                 ingredient={this.props.ings}
                 price={this.props.price}
                 purchaseCancelled={this.purchaseCancelHandler}
                 purchaseContinue={this.purchaseContinueHandler} />
                }          
         return(
             
              <Auxiliary>
                  <Modal show={this.state.parchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                    </Modal>
                    {burger}
                  
              </Auxiliary>
         );
     }
}
const mapStateToProps = state=> {
    return{
        ings: state.burgerBuilder.ingredient,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}
const mapDispatchToProps=dispatch =>{
    return{
         onIngredientAdded:(ingName)=>dispatch(actions.addIngredient(ingName)),
         onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
         onInitIngredient: () => dispatch(actions.initIngredient()),
         onInitPurchase:()=> dispatch(actions.purchaseInit()),
         onSetAuthRedirectPath:(path)=>dispatch(actions.setAuthRedirectPath(path))
     }
}
export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler( BurgerBilder,axios)) ;
