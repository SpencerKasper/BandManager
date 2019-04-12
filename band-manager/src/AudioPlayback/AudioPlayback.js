import React from 'react';
import AppHeader from '../AppComponents/AppHeader';
import AudioPlayer from 'react-responsive-audio-player';
import 'react-responsive-audio-player/dist/audioplayer.css';
import Axios from 'axios';
import Song from './Song';
import './AudioPlayback.css';
import ErrorMessage from '../Error/ErrorMessage';

class AudioPlayback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        songName: "",
        artist: "",
        genre: "",
        audioPlayers: [],
        controls: [
            "playpause"
        ],
        URLs: [],
        songs: [],
        error: [],
        bSongsToDisplay: false,
        tracks: []
    };
    
    this.buildPlaylist = this.buildPlaylist.bind(this);
    this.buildAudioPlayers = this.buildAudioPlayers.bind(this);
    this.handleSongName = this.handleSongName.bind(this);
    this.handleArtist = this.handleArtist.bind(this);
    this.handleGenre = this.handleGenre.bind(this);
}

componentDidMount(){
    this.buildAudioPlayers();
}

buildPlaylist(URL, track){
    const playlist = [{
        url: URL,
        title: track.filename,
        artist: "Temp Artist",
        album: "Temp Album"
    }]

    return playlist;
}

buildAudioPlayers(){
    const audioPlayers = [];
    const bucketName = "F I Z Z";

    Axios.get("http://localhost:3000/mediaHandler/" + bucketName)
        .then(response => {
            const tracks = response.data.tracks;

            for(var i = 0; i < tracks.length; i++){
                if(tracks[i] !== null){
                    const URL = "http://localhost:3000/mediaHandler/" + tracks[i]._id + "/" + bucketName;
                
                    const playlist = this.buildPlaylist(URL, tracks[i]);
                
                    audioPlayers.push(
                        <AudioPlayer
                        key={i} 
                        className="player"
                        playlist={playlist}
                        controls={this.state.controls}/>
                    )
                }
            }
            
            const songs = [];

            for(var i = 0; i < audioPlayers.length; i++){
                songs.push(
                    <Song
                        audioPlayer={audioPlayers[i]}
                        songTitle={tracks[i].filename}
                        album={"Elise and the Police LP"}/>
                )
            }

            this.setState({
                audioPlayers: audioPlayers,
                songs: songs,
                bSongsToDisplay: (songs.length > 0 ? true : false)
            });
        })
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
    const bSongsToDisplay = this.state.bSongsToDisplay;
    const error = [];

    if(!bSongsToDisplay) {
        error.push(<ErrorMessage errorMessage={"There are no songs to display! Please go to the upload page to upload media."}/>);
    }

    return (
      <div>
        <AppHeader title="Audio Player"/>
        {error}

        {this.state.songs}
      </div>
    );
  }
}

export default AudioPlayback;