import React from 'react';
import AppHeader from '../AppComponents/AppHeader';
import AudioPlayer from 'react-responsive-audio-player';
import 'react-responsive-audio-player/dist/audioplayer.css';

class AudioPlayback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        songName: "",
        artist: "",
        genre: "",
        playlist: [{
            url: "http://localhost:3000/mediaHandler/5cab8b016b81ed4b340d7681/track",
            title: 'Rest Easy',
            artist: 'Elise and the Police',
            album: 'Bitter Jester Recordings'
        }],
        controls: [
            "playpause",
            "progressdisplay"
        ]
    };

    this.handleSongName = this.handleSongName.bind(this);
    this.handleArtist = this.handleArtist.bind(this);
    this.handleGenre = this.handleGenre.bind(this);
}

  handleSongName(songName){
      this.setState({
        songName: songName
      })
  }

  handleArtist(artist){
      this.setState({
          artist: artist
      })
  }

  handleGenre(genre){
      this.setState({
          genre: genre
      })
  }

  render() {
    return (
      <div>
        <AppHeader title="Audio Player"/>

        <AudioPlayer 
            playlist={this.state.playlist}
            controls={this.state.controls}/>
      </div>
    );
  }
}

export default AudioPlayback;