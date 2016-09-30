import React from 'react'
import Page from "./Page.jsx"
import NeDBStorage from "../model/NeDBStorage"
import { Link } from 'react-router'
import FlatButton from 'material-ui/FlatButton';
import ConfirmButton from './ConfirmButton'

let storage = new NeDBStorage

export default class Notebook extends React.Component{
   constructor(props){
      super(props)
      this.state = {notebook: {}, title: null}
      this.removePageHandler = this.removePageHandler.bind(this)
   }

   componentDidMount() {
      storage.getNotebook(this.props.params.notebookId).then(function (notebook){
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
      return function(){
         let ntb = this.state.notebook
         ntb.pages = ntb.pages.filter( (page) => {
            return page._id !== id
         } )

         storage.updateNotebook(this.state.notebook._id, {
            $pull:{ pages: id }
         })
         storage.removePage(id)

         this.setState({
            notebook: ntb
         })


      }.bind(this)
   }

   render(){
      let pages = []
      let id = this.state.notebook._id



      for(let [i, page] of (this.state.notebook.pages || []).entries()){
         let moveUpButton, moveDownButton
         if(i == 0) {
            moveUpButton = null
         } else {
            moveUpButton = <FlatButton
               containerElement={<a />}
               label="Move up" />
         }
         if(i == this.state.notebook.pages.length -1){
            moveDownButton = null
         }else{
            moveDownButton = <FlatButton
               containerElement={<a />}
               label="Move Down" />
         }
         pages.push(
            <Page key={page._id} title={page.title} subtitle={page.subtitle} text={page.text}>
               <FlatButton
                  containerElement={<Link to={"/notebook/" + id + "/" + page._id + "/edit"} />}
                  label="Edit page" />
               <ConfirmButton
                  containerElement={<a />}
                  label="Remove page"
                  confirmLabel="Click to remove this page"
                  secondary={true}
                  onTouchTap={this.removePageHandler(page._id)}/>
               {moveUpButton}
               {moveDownButton}
            </Page>
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
