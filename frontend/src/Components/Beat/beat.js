import React from "react";
import axios from "axios"
import Pads from "./pad"
import Sequencer from "./sequencer/sequencer"



class Beat extends React.Component {

    constructor() {
        super();

        this.browserAudioLibrary = new AudioContext();   

        

        this.state = {
            loadedFileAudioBuffers: [],
            userFileAudioBufferLibrary: []
        }
      }

      handleAudioBufferChanges = (arr) => {
          this.setState({
              loadedFileAudioBuffers: arr
          })
      }


    render(){
        var quickCss = {
            border: '5px solid'
          };
          const {loadedFileAudioBuffers} = this.state
        console.log('state' , loadedFileAudioBuffers)
        
        return (
            <div>
                MPC8888

                <Sequencer loadedFileAudioBuffers = {loadedFileAudioBuffers} 
                browserAudioLibrary= {this.browserAudioLibrary} />

                <Pads loadedFileAudioBuffers = {this.state.loadedFileAudioBuffers} 
                browserAudioLibrary= {this.browserAudioLibrary} 
                handleAudioBufferChanges= {this.handleAudioBufferChanges} />

                <div >
                    
                </div>
            </div>
        )
    }
}


export default Beat ;