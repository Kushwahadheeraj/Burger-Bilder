import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import './CheckoutSummary.css';
const checkoutSummary = (props)=>{
    return( 
        <div className="CheckoutSummary">  
           <h1>We hope it tastes well!</h1>
            <div style={{width:'100%',textAlign:'center', margin:'auto',}}>
              <Burger ingredient={props.ingredient}/>
            </div>
            <Button btnType="Danger" clicked={props.checkoutCancaled}>CANCAL</Button>
             <Button btnType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    )
}
export default checkoutSummary;