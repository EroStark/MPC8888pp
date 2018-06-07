import React from "react";
import "../beat.css";

class Sequencer extends React.Component{
    constructor(){
        super();
        this.state = {
            allTracks: []
        }

    }
    
    componentDidMount(){
        const {loadedFileAudioBuffers} = this.props
        const newTracks = [...this.state.allTracks]
        
        loadedFileAudioBuffers.forEach((pad,idx) => {
            return newTracks[idx] = "deez"
        })

        

        this.setState({
            allTracks: newTracks
        })

        console.log('new tracks' , this.state.allTracks)

    }


    render(){
        const {loadedFileAudioBuffers} = this.props
        return(
            <div className="pads">
                
            </div>
        )
    }

}

export default Sequencer 