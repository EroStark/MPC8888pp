import React from "react";
import "../beat.css";


class SingleTrack extends React.Component{
    constructor(){
        super();

    }
    
    changeSequence = e => {
        const {track , changeTracks} = this.props
        let trackPattern = track.pattern.split('')
        if(trackPattern[e.target.id] === "0"){
            trackPattern[e.target.id] = "1"
        } else {
            trackPattern[e.target.id] = "0"
        }

        track.pattern = trackPattern.join('')

        
        changeTracks(track)
        console.log('track after click',track)
    }

    toggleMute = () => {
        const {track, changeTracks} = this.props
        track.play = !track.play
        changeTracks(track)
    }

    render(){
        const {track} = this.props
        let trackPattern = track.pattern.split('')
        const mute = track.play === true ? "mute muteHighlighted" : "mute"
        console.log('track', track, mute)
        
        return(
            <div className="track">
                <div className={mute} onClick={this.toggleMute} /> 
                {trackPattern.map((note,idx) => {
                    const highlight = note === "1" ? "note padHighlighted" : "note"
                    return <div className={highlight} id={idx} onClick={this.changeSequence}/>
                })}
            </div>
        )
    }

}

export default SingleTrack