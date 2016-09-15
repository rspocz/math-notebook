import React from 'react'
import {Card, CardTitle, CardText} from 'material-ui/Card';
import MathDisplay from "./MathDisplay.jsx"

export default class Page extends React.Component{
   constructor(props){
      super(props)
   }

   render(){
      let title = this.props.title || ""
      let subtitle = this.props.subtitle || ""
      let text = this.props.text || ""
      return (
         <Card>
            <CardTitle title={title} subtitle={subtitle} />
            <CardText>
               <MathDisplay data={text} />
            </CardText>
         </Card>
      )
   }
}
