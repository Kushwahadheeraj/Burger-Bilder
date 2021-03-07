
import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';
 const initialState={
     ingredient:null,
     totalPrice:50,
     error:false
 };
const INGREDIENT_PRICES = {
    salad: 10,
    bacon: 25,
    cheese: 30,
    meat: 40
}
const addIngredient =(state,action)=>{
    const updatedIngredient={[action.ingredientName]:state.ingredient[action.ingredientName]+1}
    const updatedIngredients=updateObject(state.ingredient,updatedIngredient);
    const updatedState={
        ingredient:updatedIngredients,
        totalPrice:state.totalPrice+INGREDIENT_PRICES[action.ingredientName],
        building:true    
    }
    return updateObject(state,updatedState);
};
const removeIngredient = (state, action) => {
    const updatedIng = { [action.ingredientName]: state.ingredient[action.ingredientName] - 1 }
    const updatedIngs= updateObject(state.ingredient, updatedIng);
    const updatedSt = {
        ingredient: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedSt);
};
const setIngredient =(state,action)=>{
    return updateObject(state, {
        ingredient: {
            salad: action.ingredient.salad,
            bacon: action.ingredient.bacon,
            cheese: action.ingredient.cheese,
            meat: action.ingredient.meat
        },
        totalPrice:50,
        error: false,
        building:false
    });
};
const fetchIngredientFailed=(state,action)=>{
    return updateObject (state,{error:true});
};

 const reducer = (state =initialState,action)=>{
    switch (action.type){
        case actionTypes.ADD_INGREDIENT:return addIngredient(state,action);
        case actionTypes.REMOVE_INGREDIENT:return removeIngredient(state,action);
        case actionTypes.SET_INGREDIENT:return setIngredient(state, action);
        case actionTypes.FETCH_INGREDIENT_FAILED:return fetchIngredientFailed(state,action);
        default:return state;
    }       
 };
 export default reducer;
