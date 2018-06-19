import React from "react";
import "../beat.css";
import SingleTrack from "./singleTrack"

class Sequencer extends React.Component{
    constructor(){
        super();

    }
    


    render(){
        const {loadedFileAudioBuffers, allTracks} = this.props
        return(
            <div className="pads">
                {allTracks.map(track =>{ 
                     if(track){
                         return (<SingleTrack track={track} /> )
                        }
                    
                 } ) }
            </div>
        )
    }

}

export default Sequencer 