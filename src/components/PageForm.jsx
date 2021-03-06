import React  from 'react';
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

   componentWillReceiveProps(nextProps){
      this.setState({
         title: nextProps.title || this.state.title,
         subtitle: nextProps.subtitle || this.state.subtitle,
         text: nextProps.text || this.state.text,
      })
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
      let title = this.state.title
      let subtitle = this.state.subtitle
      let text = this.state.text
      return (
         <form>
            <Paper zDepth={1}>
               <CardText>
                  <h1>Create new page</h1>
                  <div>
                     <TextField hintText="Page title" onChange={this.updateTitle} value={title} />
                  </div><div>
                     <TextField hintText="Page subtitle" onChange={this.updateSubtitle} value={subtitle} />
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
                  value={text}
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
