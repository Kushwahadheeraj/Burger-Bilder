import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = ( name ) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = ( name ) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const setIngredient = ( ingredient ) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredient: ingredient
    };
};

export const fetchIngredientFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENT_FAILED
    };
};

export const initIngredient = () => {
    return dispatch => {
        axios.get('https://react-my-burger-6f14d-default-rtdb.firebaseio.com/ingredient.json')
            .then( response => {
               dispatch(setIngredient(response.data));
            } )
            .catch( error => {
                dispatch(fetchIngredientFailed());
            } );
    };
};