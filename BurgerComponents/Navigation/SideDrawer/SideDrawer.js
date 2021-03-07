import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import './SideDrawer.css';
import BackDrop from '../../UI/BackDrop/BackDrop'
import Auxiliary from '../../../BurgerHoc/Auxiliary'
const sideDrawer=(props)=>{
         
      return(
            <Auxiliary>
            <BackDrop show={props.open} clicked={props.closed}/>
            <div className={`SideDrawer ${props.open?"Open":"Close"}`} onClick={props.closed}>
               <Logo className="Logo"/>
               <nav>
                  <NavigationItems isAuthenticated={props.isAuth} />
               </nav>
            </div>
      </Auxiliary>
     
      ) };
export default sideDrawer;