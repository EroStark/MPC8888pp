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
    reader.onload = (e) => {
    //   this.storeInstrument(reader.result)
      this.initSound(reader.result);
    };
    reader.readAsArrayBuffer(e.target.files[0]);
  };

  initSound = soundBuffer => { 
    const { pads } = this.state
    const { browserAudioLibrary, loadedFileAudioBuffers , handleAudioBufferChanges} = this.props
   
    const audioBuffers = [...loadedFileAudioBuffers] //****** 
    const browserAudioApi = browserAudioLibrary

    var assign = pads.filter((s) => s.assignClassList.includes("assignHighlighted"));
    // console.log(
    // "now we need to process uadio from loaded file",
    // this.browserAudioLibrary
    // );
        browserAudioApi.decodeAudioData( //****** 
            soundBuffer,
            function(buffer) {
                var whichButton = assign[0].id;
                audioBuffers[whichButton] = buffer; 
            },
            function(e) {
                console.log("Error decoding file", e);
            }
        );

        var highlightPad = pads.map((pad, sidx) => {
            if (assign[0].id == pad.id)
              return { ...pad, padClassList: "pad padHighlighted" , assignClassList: "padAssign" };
            return { ...pad, assignClassList: "padAssign" };
          });

          handleAudioBufferChanges(audioBuffers)
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
