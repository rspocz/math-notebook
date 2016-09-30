import React from 'react'
import { Link } from 'react-router'
import FlatButton from 'material-ui/FlatButton';
import ConfirmButton from './ConfirmButton'
import NeDBStorage from '../model/NeDBStorage'
import NotebookPreview from './NotebookPreview'
import {CardActions} from 'material-ui/Card';

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

   deleteNotebook(id){
      return function (){
         console.warn(id)
      }
   }

   render(){
      let notebooks = [];

      for(var ntb of this.state.notebooks){
         notebooks.push(
            <NotebookPreview notebook={ntb} key={ntb._id}>
               <CardActions>
                  <FlatButton
                     containerElement={<Link to={"/notebook/" + ntb._id} />}
                     label="Show notebook" />

                  <FlatButton
                     containerElement={<Link to={"/notebook/" + ntb._id} />}
                     label="Edit notebook" />

                  <FlatButton
                     containerElement={<Link to={"/notebook/" + ntb._id} />}
                     label="Export notebook" />

                  <ConfirmButton
                     containerElement={<a />}
                     label="Remove notebook"
                     confirmLabel="Click to remove notebook"
                     secondary={true}
                     onTouchTap={ this.deleteNotebook(ntb._id) }/>
               </CardActions>
            </NotebookPreview>
         )
      }

      return (
         <div>
            {notebooks}

            <Link to="/notebook/new">Add notebook</Link>
         </div>
      )
   }
}
