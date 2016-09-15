import '../assets/stylesheets/base.scss';
import React, { Component } from 'react';
import MathInputTest from './MathInputTest'
import { Router, Route, Link, browserHistory } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export default class App extends React.Component{
   constructor(){
      super()
      this.state = {menuOpen: false}
      this.handleShow = this.handleShow.bind(this)
      this.handleClose = this.handleClose.bind(this)
      this.menuRequestChange = this.menuRequestChange.bind(this)
   }

   handleShow(){
      this.setState({menuOpen: true});
   }

   handleClose(){
      this.setState({menuOpen: false});
   }

   menuRequestChange(state){
      this.setState({menuOpen: state});
   }

   render() {
    return(
      <MuiThemeProvider>
         <div>
         <AppBar
            title="MWriter"
            iconElementRight={<IconButton><NavigationClose /></IconButton>}
            onLeftIconButtonTouchTap={this.handleShow}
         />

         <Drawer
             docked={false}
             width={200}
             open={this.state.menuOpen}
             onRequestChange={this.menuRequestChange}
         >
            <MenuItem
               containerElement={<Link to="/" />}
               onTouchTap={this.handleClose}>
               Root
            </MenuItem>
            <MenuItem
               containerElement={<Link to="/show-notebooks" />}
               onTouchTap={this.handleClose}>
               Show Notebooks
            </MenuItem>
         </Drawer>

         {this.props.children}

         </div>
      </MuiThemeProvider>
    )
  }
};
