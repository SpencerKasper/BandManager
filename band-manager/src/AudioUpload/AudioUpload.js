import React from 'react';
import InputItemGroup from '../AppComponents/InputItemGroup';
import { Form, Button } from 'reactstrap';
import AppHeader from '../AppComponents/AppHeader';
import {FilePond, registerPlugin} from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import './AudioUpload.css';
import FilePondPluginFileMetadta from 'filepond-plugin-file-metadata';

class AudioUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        songName: "song",
        artist: "artist",
        genre: "genre"
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
        <AppHeader title="Audio Upload"/>

        <Form>
            <InputItemGroup
                labelName={"Song Name:"}
                inputType={"text"}
                placeholder={"Enter your song name here."}
                errorMessage={""}
                shareItemValue={this.handleSongName}
            />

            <InputItemGroup
                labelName={"Artist:"}
                inputType={"text"}
                placeholder={"Enter artist here."}
                errorMessage={""}
                shareItemValue={this.handleArtist}
            />

            <InputItemGroup
                labelName={"Genre:"}
                inputType={"text"}
                placeholder={"Enter the genre of your song here."}
                errorMessage={""}
                shareItemValue={this.handleGenre}
            />
        </Form>

        <FilePond 
            name={"track"} 
            server="http://localhost:3000/mediaHandler/track"
            />

        <div className="uploadButton">
            <Button>Upload</Button>
        </div>
      </div>
    );
  }
}

export default AudioUpload;