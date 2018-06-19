import React from "react";
import "../beat.css";


class SingleTrack extends React.Component{
    constructor(){
        super();

    }
    
    

    render(){
        const {track} = this.props
        let trackPattern = track.pattern.split('')
        
        return(
            <div className="track">
                {trackPattern.map(note => {
                    return <div className="note"/>
                })}
            </div>
        )
    }

}

export default SingleTrack