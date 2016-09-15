import React from 'react'
import Paper from 'material-ui/Paper';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import { Link } from 'react-router'

export default class NotebookPreview extends React.Component{
   constructor(){
      super()
   }

   render (){
      let notebook = this.props.notebook || {}
      let name = notebook.name || ""
      let id = notebook._id || ""

      return (
         <Paper zDepth={1}>
            <CardTitle title={name} />

            <CardText>
               <Link to={"/notebook/"+id}>Show notebook </Link>
            </CardText>
         </Paper>
      )
   }
}
