import React from 'react'
import FlatButton from 'material-ui/FlatButton';

export default class ConfirmButton extends React.Component{
   constructor(props){
      super(props)
      this.state = {
         clicked: false
      }

      this.timer = null

      this.clicked = this.clicked.bind(this)
   }

   clicked(){
      clearTimeout(this.timer)
      if(this.state.clicked === false){
         this.setState({
            clicked: true
         })
         this.timer = setTimeout(function (){
            this.setState({
               clicked: false
            })
         }.bind(this), 5000)
      } else{
         this.props.onTouchTap(this)
      }
   }

   render(){
      let label = this.props.label || ""
      let confirmLabel = this.props.confirmLabel || ""
      let primary = this.props.primary || false
      let secondary = this.props.secondary || false
      let containerElement = this.props.containerElement || <button />
      let clicked = this.state.clicked

      return (
         <FlatButton
            label={clicked? confirmLabel : label}
            containerElement={containerElement}
            primary={primary}
            secondary={secondary}
            onTouchTap={this.clicked} />
      )
   }
}

ConfirmButton.propTypes = {
   onTouchTap: React.PropTypes.func
}
