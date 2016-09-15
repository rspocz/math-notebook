import Page from "./Page.jsx"
import React  from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import PageForm from './PageForm'

import NeDBStorage from "../model/NeDBStorage"

let storage = new NeDBStorage

const textAreaStyle = {
  paddingLeft: 20,
  paddingRight: 20,
  width: "calc(100% - 40px)"
};

export default class PageEditor extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         page: {},
         notebookId: null,
         pageId: null
      }

      this.formSend = this.formSend.bind(this)
      this.formChanged = this.formChanged.bind(this)
   }

   componentDidMount() {
      if(this.props.params.notebookId){
         this.setState({
            notebookId: this.props.params.notebookId
         })
      }else if(this.props.params.pageId){
         this.setState({
            pageId: this.props.params.pageId
         })
      }else{
         console.log("Error - PageEditor with no page to edit")
      }
   }

   formSend(page){
      console.log(page)
      if(this.state.pageId){
         page = Object.assign({}, page, {_id: this.state.pageId})
         storage.updatePage(this.state.pageId, {$set: page})
      } else{
         storage.savePage(page).then( function (page){
            return storage.updateNotebook(
               this.state.notebookId,
               {
                  $push: {
                     pages: page._id
                  }
               }
            )
         }.bind(this)).then(function (){
            this.context.router.push("notebook/"+this.state.notebookId)
         }.bind(this))
      }
   }

   formChanged(page){
      this.setState({
         page: Object.assign({}, this.state.page, page)
      })
   }

   render() {
      let title = this.state.page.title;
      let subtitle = this.state.page.subtitle;
      let text = this.state.page.text;

      return (
         <div>
            <PageForm onSend={this.formSend} onChange={this.formChanged}/>
            <p></p>
            <Page title={title} subtitle={subtitle} text={text} />
         </div>
      );
   }
}

PageEditor.contextTypes = {
    router: React.PropTypes.object.isRequired
}
