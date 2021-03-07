import React from 'react';
import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
const Controls=[
    {lable:'Salad',type:'salad'},
    {lable:'Bacon',type:'bacon'},
    {lable:'Cheese',type:'cheese'},
    {lable:'Meat',type:'meat'}
];
const buildControls=(props)=>(
    <div className="BuildControls">
        <p className="CurrentPrice">Current Price:<strong>{props.price}</strong> RS</p>
          { Controls.map(ctrl=>(
              <BuildControl
              key={ctrl.lable} 
              lable={ctrl.lable}
              added={()=>props.ingredientAdded(ctrl.type)}
              removed={()=>props.ingredientRemoved(ctrl.type)}
              disabled={props.disabled[ctrl.type]} />
          ))}
           <button className="OrderButton" 
           disabled={!props.purchasable}
           onClick={props.ordered}>
               {props.isAuth ? 'ORDER NOW' : 'SING UP TO ORDER'}
               </button>
    </div>
);
export default buildControls;