import React from "react";
import "./pads.css";

class Pad extends React.Component {
  constructor() {
    super();

    this.loadedFileAudioBuffers = [];
    this.browserAudioLibrary = new AudioContext();
    
    this.state = {
      pads: [
        { id: 0, padClassList: 'pad', assignClassList: "padAssign" },
        { id: 1 , padClassList: 'pad', assignClassList: "padAssign" },
        { id: 2 , padClassList: 'pad', assignClassList: "padAssign" },
        { id: 3 ,padClassList: 'pad', assignClassList: "padAssign" }
      ],
      file: false
    };
  }

  handleHighlight = e => {
    var { pads } = this.state;
    var highlight = pads.map((pad, sidx) => {
      if (e.target.id == sidx)
        return { ...pad, assignClassList: "padAssign assignHighlighted" };
      return { ...pad, assignClassList: "padAssign" };
    });
    console.log("main", highlight);
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

  filePicked = e => {
    console.log("file picked", e.target.files[0]);

    var reader = new FileReader();
    reader.onload = (e) => {
      console.log("file finished loading");
      this.initSound(reader.result);
    };
    reader.readAsArrayBuffer(e.target.files[0]);
  };

  initSound = soundBuffer => { 
    const { pads } = this.state

    const audioBuffers = this.loadedFileAudioBuffers
    var assign = pads.filter((s) => s.assignClassList.includes("assignHighlighted"));
    // console.log(
    // "now we need to process uadio from loaded file",
    // this.browserAudioLibrary
    // );
        this.browserAudioLibrary.decodeAudioData(
            soundBuffer,
            function(buffer) {
                var whichButton = assign[0].id;
                audioBuffers[whichButton] = buffer; //buttons ID becomes place in the loadedSounds
                console.log("stored file", audioBuffers);
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

          this.setState({
              pads: highlightPad
          })
  };

  playSound = (e) => {
 
        var whichButton = e.target.id //substring of button id #
    
        const player = this.browserAudioLibrary.createBufferSource();
        player.buffer = this.loadedFileAudioBuffers[whichButton];
        player.loop = false;
        player.connect(this.browserAudioLibrary.destination);
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
            />
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
