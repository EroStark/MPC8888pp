import React from "react";
import "./pads.css"

class Pad extends React.Component{

    constructor(){
        super();
        this.state = {
            highlighted: false,
            pads: [{padHighlighted:false , assignHighlighted:false},
                {padHighlighted:false , assignHighlighted:false}, 
                {padHighlighted:false , assignHighlighted:false}]
        }
    }

    handleHighlight = () => {
        var {highlighted} = this.state
        console.log('here')
        this.setState({
            highlighted: !highlighted
        })
    }

    render(){
        var {highlighted, pads} = this.state
        var assignClasslist = highlighted ? "padAssign assignHighlighted" : "padAssign"

        
        return(
            <div className="pads">
              {pads.map((pad) =>(
               <div className="padContainer">	
	                <div className="pad" id="box0"></div>
	                <div className={assignClasslist} id="assign0" onClick={this.handleHighlight}>a</div>
                </div>
              ))}
            
            </div>
        )
    }
}

export default Pad;