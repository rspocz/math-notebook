import React from 'react'
import {Card, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import NotebookPreview from "./NotebookPreview"
import { Link } from 'react-router'

import NeDBStorage from "../model/NeDBStorage"

let storage = new NeDBStorage

export default class Notebooks extends React.Component{
   constructor(props){
      super(props)
      this.state = {
         notebooks: []
      }
   }

   componentDidMount() {
      //this.props.id
      storage.getNotebooks().then( function(notebooks){
         this.setState({
           notebooks: notebooks
         });
      }.bind(this))
   }

   componentWillUnmount() {
    //this.serverRequest.abort();
   }

   render(){
      let notebooks = [];

      for(var ntb of this.state.notebooks){
         notebooks.push(
            <NotebookPreview notebook={ntb} key={ntb._id} />
         )
      }

      return (
         <div>
            {notebooks}
         </div>
      )
   }
}
