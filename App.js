import React from 'react';
import { Component } from 'react';
import {Route, Switch,withRouter,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import asyncComponent from './BurgerHoc/asyncComponent/asyncComponent';

import Layout from './BurgerHoc/Layout/Layout';
import BurgerBilder from './BurgerContainers/BurgerBilder/BurgerBilder'
import Logout from './BurgerContainers/Auth/Logout/Logout'
import * as actions from './Store/actions/index'; 

const asyncCheckout =asyncComponent(()=>{
    return import('./BurgerContainers/Checkout/Checkout');
});

const asyncAuth= asyncComponent(() => {
    return import('./BurgerContainers/Auth/Auth');
});

const asyncOrders = asyncComponent(() => {
    return import('./BurgerContainers/Orders/Orders');
});

class App extends Component{
    componentDidMount(){
        this.props.onTryAutoSignup();
    }
    render(){
        let routes=(
            <Switch>
                <Route path="/auth" component={asyncAuth} />
                <Route path="/" exact component={BurgerBilder} />
                <Redirect to="/"/>
            </Switch>
        );
        if(this.props.isAuthenticated){
            routes=(
                <Switch>
                    <Route path="/Checkout" component={asyncCheckout} />
                    <Route path="/orders" component={asyncOrders} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/auth" component={asyncAuth} />
                    <Route path="/" exact component={BurgerBilder} />
                    <Redirect to="/"/>
                </Switch>
            );
        }
        return(
            <div>
                <Layout>
                       {routes}
                </Layout>
            </div>
        )
    }
}
const mapStateToProps = state=>{
    return{
        isAuthenticated:state.auth.token!==null
    };
};
const mapDispatchToProps = dispatch=>{
    return{
        onTryAutoSignup:()=>dispatch(actions.authCheckState())
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps) (App));