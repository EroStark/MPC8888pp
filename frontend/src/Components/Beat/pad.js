import React from "react";
import "./pads.css";

class Pad extends React.Component {
  constructor() {
    super();

    this.loadedFileAudioBuffers = [];
    this.browserAudioLibrary = new AudioContext();
    
    this.state = {
      highlighted: false,
      pads: [
        { id: 0, padHighlighted: false, assignClassList: "padAssign" },
        { id: 1 , padHighlighted: false, assignClassList: "padAssign" },
        { id: 2 , padHighlighted: false, assignClassList: "padAssign" },
        { id: 3 ,padHighlighted: false, assignClassList: "padAssign" }
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
      { id: pads.length , padHighlighted: false, assignClassList: "padAssign" }
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
    console.log("file pic", e.target.files[0]);

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
    console.log(
      "now we need to process uadio from loaded file",
      this.browserAudioLibrary
    );
    this.browserAudioLibrary.decodeAudioData(
      soundBuffer,
      function(buffer) {
        var assign = pads.filter((s) => s.assignClassList.includes("assignHighlighted"));
        console.log('here',assign);
        var whichButton = assign[0].id;
        console.log('button', whichButton) //substring of button id #

        audioBuffers[whichButton] = buffer;
        console.log("stored file", audioBuffers);
        // assign.classList.remove('assignHighlighted');
        //        playSound();
      },
      function(e) {
        console.log("Error decoding file", e);
      }
    );

    console.log('after' , this.loadedFileAudioBuffers )
  };

  render() {
    var { pads } = this.state;

    return (
      <div className="pads">
        {pads.map((pad, idx) => (
          <div className="padContainer">
            <div className="pad" id={idx} />
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
