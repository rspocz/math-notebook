import React from 'react'
import {Card, CardTitle, CardText} from 'material-ui/Card';
import Page from "./Page.jsx"
import NeDBStorage from "../model/NeDBStorage"
import { Link } from 'react-router'

let storage = new NeDBStorage

export default class Notebook extends React.Component{
   constructor(props){
      super(props)
      this.state = {notebook: {}}
   }

   componentDidMount() {
      console.log(this.props.params.notebookId)
      storage.getNotebook(this.props.params.notebookId).then(function (notebook){
         console.log(notebook)
         this.setState({
            notebook: notebook
         })
      }.bind(this))
   }

   componentWillUnmount() {
      //this.serverRequest.abort();
   }

   render(){
      let pages = []
      let name = this.state.notebook.name
      let id = this.state.notebook._id

      for(var page of this.state.notebook.pages || []){
         pages.push(
            <Page key={page._id} title={page.title} subtitle={page.subtitle} text={page.text} />
         )
      }
      return (
         <div>
            {pages}

            <Link to={"/notebook/"+id+"/new-page"}>Add page</Link>
         </div>
      )
   }
}
