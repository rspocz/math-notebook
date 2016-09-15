import Page from "./Page.jsx"
import React  from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const textAreaStyle = {
  paddingLeft: 20,
  paddingRight: 20,
  width: "calc(100% - 40px)"
};

export default class PageForm extends React.Component{
   constructor(props){
      super(props)
      this.state = {
         title: '',
         subtitle: '',
         text: ''
      }

      this.updateText = this.updateText.bind(this);
      this.updateTitle = this.updateTitle.bind(this);
      this.updateSubtitle = this.updateSubtitle.bind(this);
      this._fireChanged = this._fireChanged.bind(this);
      this._fireSend = this._fireSend.bind(this);
   }

   updateText(event) {
      var nText = event.target.value;
      this.setState(function () {
         return {text: nText};
      }, function(){
         this._fireChanged()
      }.bind(this));
   }

   updateTitle(event) {
      var nText = event.target.value;
      this.setState(function () {
         return {title: nText};
      }, function(){
         this._fireChanged()
      }.bind(this));
   }

   updateSubtitle(event) {
      var nText = event.target.value;
      this.setState(function () {
         return {subtitle: nText};
      }, function(){
         this._fireChanged()
      }.bind(this));
   }

   _fireChanged(){
      if(this.props.onChange){
         this.props.onChange({
            title: this.state.title,
            subtitle: this.state.subtitle,
            text: this.state.text
         })
      }
   }

   _fireSend(){
      if(this.props.onSend){
         this.props.onSend({
            title: this.state.title,
            subtitle: this.state.subtitle,
            text: this.state.text
         })
      }
   }

   render(){
      return (
         <form>
            <Paper zDepth={1}>
               <CardText>
                  <h1>Create new page</h1>
                  <div>
                     <TextField hintText="Page title" onChange={this.updateTitle} />
                  </div><div>
                     <TextField hintText="Page subtitle" onChange={this.updateSubtitle} />
                  </div>
               </CardText>
            </Paper>
            <Paper zDepth={1}>
            <TextField
               hintText="Page Content"
               multiLine={true}
               rowsMax={10}
               underlineShow={false}
               style={textAreaStyle}
               onChange={this.updateText}
            />
            </Paper>
            <Paper zDepth={1}>
               <CardText>
                  <RaisedButton label="Save" primary={true} onClick={this._fireSend}/>
               </CardText>
            </Paper>
         </form>
      )
   }
}

PageForm.propTypes = {
   onSend: React.PropTypes.func,
   onChange: React.PropTypes.func
};
