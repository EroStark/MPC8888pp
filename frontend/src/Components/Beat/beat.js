import React from "react";
import axios from "axios";
import Pads from "./pad";
import Sequencer from "./sequencer/sequencer";

class Beat extends React.Component {
  constructor() {
    super();

    this.browserAudioLibrary = new AudioContext();

    this.state = {
      loadedFileAudioBuffers: [],
      userFileAudioBufferLibrary: [],
      allTracks: []
    };
    this.handleAudioBufferChanges = this.handleAudioBufferChanges.bind(this);
  }

  handleAudioBufferChanges(arr) {
    const newTracks = [...this.state.allTracks];

    console.log("new Buffers", arr);
    arr.forEach((pad, idx) => {
      if (pad) {
        return (newTracks[idx] = {
          id: idx,
          play: true,
          pattern: "0000000000000000"
        });
      }
    });

    this.setState({
      loadedFileAudioBuffers: arr,
      allTracks: newTracks
    });
  }

  render() {
    const { loadedFileAudioBuffers, allTracks } = this.state;
    // console.log("loaded", loadedFileAudioBuffers);
    // console.log("all Tracks", allTracks);

    return (
      <div>
        MPC8888
        <Sequencer
          loadedFileAudioBuffers={loadedFileAudioBuffers}
          browserAudioLibrary={this.browserAudioLibrary}
          allTracks={allTracks}
        />
        <Pads
          loadedFileAudioBuffers={this.state.loadedFileAudioBuffers}
          browserAudioLibrary={this.browserAudioLibrary}
          handleAudioBufferChanges={this.handleAudioBufferChanges}
        />
        <div />
      </div>
    );
  }
}

export default Beat;
