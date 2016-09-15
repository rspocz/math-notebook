import React, { Component } from 'react';
import { Router, Route, Link, hashHistory } from 'react-router'
import App from "./App"
import PageEditor from "./PageEditor"
import NotebookEditor from "./NotebookEditor"
import Notebook from "./Notebook"
import Notebooks from "./Notebooks"

export default class extends Component{
   render(){
      return (
         <Router history={hashHistory}>
            <Route path="/" component={App}>
               <Route path="/page-editor" component={PageEditor} />
               <Route path="/notebook/new" component={NotebookEditor} />
               <Route path="/show-notebooks" component={Notebooks} />
               <Route path="/notebook/:notebookId" component={Notebook} />

               <Route path="/notebook/:notebookId/new-page" component={PageEditor} />
               <Route path="/notebook/:notebookId/:pageId/edit" component={PageEditor} />
            </Route>
         </Router>
      )
   }
}
