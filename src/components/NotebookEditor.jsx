import React  from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import NeDBStorage from '../model/NeDBStorage'

export default class NotebookEditor extends React.Component {
  constructor() {
    super();
    this.state = {text: ''};
    this.updateName = this.updateName.bind(this);
    this.send = this.send.bind(this);
    this.model = new NeDBStorage
  }

  updateName(event) {
     var nName = event.target.value;
     this.setState(function () {
        return {name: nName};
     });
  }

  send(event){
     this.model.saveNotebook({name: this.state.name, pages: []}).then(function (){
        this.context.router.push("show-notebooks")
     }.bind(this))
 }

  render() {
    var text = this.state.text;
    return (
      <div>
         <Card>
            <CardText>
               <h1>Create new notebook</h1>
               <div>
                  <TextField
                     hintText="Notebook name"
                     onChange={this.updateName}
                  />
               </div> <div>
                  <RaisedButton label="Save" primary={true} onClick={this.send} />
               </div>
            </CardText>
         </Card>
      </div> );
  }
}

NotebookEditor.contextTypes = {
    router: React.PropTypes.object.isRequired
}
