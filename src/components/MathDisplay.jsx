import React  from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import MarkdownIt from 'markdown-it'
import Plugin from 'markdown-it-regexp'

let inlineMathPlugin = Plugin(
  // regexp to match
  /([^\$\\]|^)\$([^\$]+?)\$/,

  // this function will be called when something matches
  function(match, utils) {
    //console.log("inline", match)
    return katex.renderToString(match[2], {
      displayMode: false
    });
  }
)

let blockMathPlugin = Plugin(
  // regexp to match
  /\$\$([\s\S]+?)\$\$/,

  // this function will be called when something matches
  function(match, utils) {
     //console.log("block", match)
     return katex.renderToString(match[1], {
       displayMode: true
     });
  }
)

export default class MathDisplay extends React.Component {
   constructor(props){
      super(props);
      this.state = {html: this.rawMarkup(this.props)}
      //this.props = {data: ""}
   }

   shouldComponentUpdate(nextProps, nextState) {
      return shallowCompare(this, nextProps, nextState);
   }

   componentWillUpdate(nextProps, nextState) {
     nextState.html = this.rawMarkup(nextProps);
  }

   rawMarkup(props) {
      var md = new MarkdownIt({
        typographer: true,
        quotes: '„“'
      });
      md.use(blockMathPlugin)
      md.use(inlineMathPlugin)

      var rawMarkup = md.render(props.data);
      return rawMarkup;
   }

   render() {
     return (
       <div dangerouslySetInnerHTML={{__html: this.state.html}} style={{fontSize: "1.2em"}}></div>
     );
   }
}
