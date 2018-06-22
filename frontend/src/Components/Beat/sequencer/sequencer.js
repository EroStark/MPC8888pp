import React from "react";
import "../beat.css";
import SingleTrack from "./singleTrack"

class Sequencer extends React.Component{
    constructor(){
        super();

    }



    changeTracks = obj => {
       const {allTracks , handleAllTracksChanges} = this.props
        const changedAllTracks = [...allTracks]
       changedAllTracks[obj.id] = obj

       handleAllTracksChanges(changedAllTracks)
    }
    


    render(){
        const {loadedFileAudioBuffers, allTracks} = this.props

        return(
            <div className="pads">
                {allTracks.map(track =>{ 
                     if(track){
                         return (<SingleTrack track={track} changeTracks={this.changeTracks} /> )
                        }
                    
                 } ) }
            </div>
        )
    }

}

export default Sequencer 