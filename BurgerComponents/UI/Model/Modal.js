import React from 'react';
import "./Modal.css";  
import Auxiliary from '../../../BurgerHoc/Auxiliary'
import BackDrop from '../BackDrop/BackDrop';
import { Component } from 'react';
class Modal extends Component{
    shouldComponentUpdate(nextProps,nextState){
         return nextProps.show !== this.props.show || nextProps.children!==this.props.children;
    } 
   render(){
       return(
           
           <Auxiliary>
               <BackDrop show={this.props.show} clicked={this.props.modalClosed} />
               <div className="Modal"
                   style={{
                       transform:this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                       opacity: this.props.show ? '1' : '0'
                   }}>
                   {this.props.children}
               </div>
           </Auxiliary>

       )
   }    
    }
export default Modal;