import React from 'react'
import {CardActions} from 'material-ui/Card';
import Page from "./Page.jsx"
import NeDBStorage from "../model/NeDBStorage"
import { Link } from 'react-router'
import FlatButton from 'material-ui/FlatButton';

let storage = new NeDBStorage

export default class Notebook extends React.Component{
   constructor(props){
      super(props)
      this.state = {notebook: {}, title: null}
      this.removePageHandler = this.removePageHandler.bind(this)
   }

   componentDidMount() {
      console.log(this.props.params.notebookId)
      storage.getNotebook(this.props.params.notebookId).then(function (notebook){
         console.log(notebook)
         this.setState({
            notebook: notebook,
            title: notebook.name
         })
      }.bind(this))
   }

   componentWillUnmount() {
      //this.serverRequest.abort();
   }

   removePageHandler(id){
      return function(event){
         let ntb = this.state.notebook
         ntb.pages = ntb.pages.filter( (page) => {
            return page._id !== id
         } )

         this.setState({
            notebook: ntb
         })


      }.bind(this)
   }

   render(){
      let pages = []
      let name = this.state.notebook.name
      let id = this.state.notebook._id

      for(var page of this.state.notebook.pages || []){
         pages.push(
            <Page key={page._id} title={page.title} subtitle={page.subtitle} text={page.text}>
               <FlatButton
                  containerElement={<Link to={"/notebook/" + id + "/" + page._id + "/edit"} />}
                  label="Edit page" />
               <FlatButton
                  containerElement={<a />}
                  label="Remove page"
                  secondary={true}
                  onTouchTap={this.removePageHandler(page._id)}/>
            </Page>
         )
      }
      return (
         <div>
            {pages}

            <Link to={"/notebook/"+id+"/new-page"}>Add page</Link>

            <Dialog ref="dialog" title="" actions="">
               dialog content
            </Dialog>
         </div>
      )
   }
}
