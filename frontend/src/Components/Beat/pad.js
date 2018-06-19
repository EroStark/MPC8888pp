import React from "react";
import axios from "axios"
import "./beat.css";

class Pad extends React.Component {
  constructor() {
    super();
    this.state = {
      pads: [
        { id: 0, padClassList: 'pad', assignClassList: "padAssign" },
        { id: 1 , padClassList: 'pad', assignClassList: "padAssign" },
        { id: 2 , padClassList: 'pad', assignClassList: "padAssign" },
        { id: 3 ,padClassList: 'pad', assignClassList: "padAssign" }
      ]
    };
  }

  // pad actions
  handleHighlight = e => {
    var { pads } = this.state;
    var highlight = pads.map((pad, sidx) => {
      if (e.target.id == sidx)
        return { ...pad, assignClassList: "padAssign assignHighlighted" };
      return { ...pad, assignClassList: "padAssign" };
    });
    this.setState({ pads: highlight });
  };

  handleAddPad = () => {
    var { pads } = this.state;
    var newPad = [
      ...pads,
      { id: pads.length , padClassList: 'pad', assignClassList: "padAssign" }
    ];
    this.setState({
      pads: newPad
    });
  };

  handleRemovePad = idx => () => {
    const { pads } = this.state;
    this.setState({
      pads: pads.filter((s, sidx) => idx !== sidx)
    });
  };
  //

  //initalize sound to array
  filePicked = e => {
    console.log("file picked", e.target.files[0]);

    // this.storeInstrument(e.target.files[0])

    var reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onload = (e) => {
      
      this.initSound(reader.result);
    };
    
  };

  initSound = soundBuffer => { 
    const { pads } = this.state
    const { browserAudioLibrary, loadedFileAudioBuffers , handleAudioBufferChanges} = this.props
   
    const audioBuffers = [...loadedFileAudioBuffers] 
    const browserAudioApi = browserAudioLibrary
    console.log('audio buffer before decode' , audioBuffers)
    var assign = pads.filter((s) => s.assignClassList.includes("assignHighlighted")); //get single assign button
    
        browserAudioApi.decodeAudioData( // decode sound we gave initSound() then...
            soundBuffer,
            function(buffer) {
                var whichButton = assign[0].id; // get id of said button
                audioBuffers[whichButton] = buffer;//   put sound in the array at that id
                handleAudioBufferChanges(audioBuffers) 
                 //   put sound in the array at that id
            },
            function(e) {
                console.log("Error decoding file", e);
            }
        );
          console.log('audioBuffer afer decode', audioBuffers)
        var highlightPad = pads.map((pad, sidx) => { //highlights the pad that got assigned
            if (assign[0].id == pad.id)
              return { ...pad, padClassList: "pad padHighlighted" , assignClassList: "padAssign" };
            return { ...pad, assignClassList: "padAssign" };
          });
          // handleAudioBufferChanges(audioBuffers) //set state with the new array
          this.setState({
              pads: highlightPad
          })

  };

  playSound = (e) => {
        
        const {browserAudioLibrary, loadedFileAudioBuffers} = this.props
        var whichButton = e.target.id //substring of button id #

    
        const player = browserAudioLibrary.createBufferSource(); //**** */
        player.buffer = loadedFileAudioBuffers[whichButton]; //**** */
        player.loop = false;
        player.connect(browserAudioLibrary.destination); //**** */
        player.start(); // Play immediately.
        
    };

  render() {
    var { pads } = this.state;

    return (
      <div className="pads">
        {pads.map((pad, idx) => (
          <div className="padContainer">
            <div className={pad.padClassList} 
            id={idx}
            onClick= {this.playSound} 
            >{idx} </div>
            <div
              className={pad.assignClassList}
              id={idx}
              onClick={this.handleHighlight}
            >
              a
            </div>
            <button
              type="button"
              className="xButton"
              onClick={this.handleRemovePad(idx)}
            >
              x
            </button>
          </div>
        ))}


        <button
          type="button"
          className="formButton"
          onClick={this.handleAddPad}
        >
          +
        </button>

        <input type="file" className="formButton" onChange={this.filePicked} />
      </div>

    );
  }
}

export default Pad;
