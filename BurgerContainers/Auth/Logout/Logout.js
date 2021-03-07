import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'
// import { Component } from "react";
import * as actions from '../../../Store/actions/index'

class Lagout extends Component{
    componentDidMount(){
        this.props.onLogout();
    }
    render(){ 
       return(
          <Redirect to="/" />
       );   
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onLogout: () => dispatch(actions.logout())
    };
    
}
export default connect(null,mapDispatchToProps)(Lagout);