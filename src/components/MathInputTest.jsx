import MathDisplay from "./MathDisplay.jsx"
import React  from 'react';

export default class MathInputTest extends React.Component {
  constructor() {
    super();
    this.state = {text: 'abc'};
    this.updateText = this.updateText.bind(this);
  }

  updateText(event) {
    var nText = event.target.value;
    this.setState(function () {
      return {text: nText};
    });
  }

  render() {
    var text = this.state.text;
    return (
      <div>
         <textarea
            onChange={this.updateText}>
         </textarea>
         <div>
            <MathDisplay data={text} />
         </div>
      </div> );
  }
}
