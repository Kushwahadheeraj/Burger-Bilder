import React from 'react';
import { Component } from 'react';
import {connect} from 'react-redux';
import Auxiliary from '../Auxiliary';
import SideDrawer from '../../BurgerComponents/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../BurgerComponents/Navigation/Toolbar/Toolbar';
import "./Layout.css";
class Layout extends Component{
    state={
         showSideDrawer:false
    }
    sideDrowerClosedHandler=()=>{
         this.setState({showSideDrawer:false})
    }
    sideDrawerToggleHandler=()=>{
        this.setState((prevState)=>{
            return{showSideDrawer: !prevState.showSideDrawer}
        });
    }
    render(){
        return(
            <Auxiliary>
            <Toolbar
            isAuth={this.props.isAuthenticated}
            drawerToggleClicked={this.sideDrawerToggleHandler}/>
            <SideDrawer 
            isAuth={this.props.isAuthenticated}
            open={this.state.showSideDrawer} 
            closed={this.sideDrowerClosedHandler}/>
            <main className="Content">
                {this.props.children}
            </main>
            </Auxiliary>
        )
    }
}   
const mapStateToProps = state =>{
    return{
        isAuthenticated: state.auth.token!==null
    };
};
export default connect(mapStateToProps) (Layout);