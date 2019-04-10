import React from 'react';
import InputItemGroup from '../AppComponents/InputItemGroup';
import { Form, Button } from 'reactstrap';
import AppHeader from '../AppComponents/AppHeader';
import {FilePond, registerPlugin} from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import './AudioUpload.css';
import FilePondPluginFileMetadata from 'filepond-plugin-file-metadata';
import ErrorMessage from '../Error/ErrorMessage';

registerPlugin(FilePondPluginFileMetadata);

class AudioUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        songName: "",
        artist: "",
        genre: "genre",
        uploadURL: "",
        filepond: [],
        errorMessage: []
    };

    this.setUploadURL = this.setUploadURL.bind(this);
    this.handleSongName = this.handleSongName.bind(this);
    this.handleArtist = this.handleArtist.bind(this);
    this.handleGenre = this.handleGenre.bind(this);
}

componentDidMount(){
   this.setUploadURL();
}

/*
 *  bFromSetArtist is used to tell us if this function call came from setting
 *  the artist or from setting the song name.
 */
setFilePondObject(bFromSetArtist){
    const bHasSongName = this.state.songName !== "" ? true : false;
    const bHasArtist = this.state.artist !== "" ? true : false;

    if(bHasSongName && bHasArtist){
        this.setState({
            filepond: [
                    <FilePond 
                        key="1"
                        name={"track"} 
                        server={this.state.uploadURL}
                        />
            ],
            errorMessage: []
        }, () => {
            this.setUploadURL();
        })
    } else {
        // Show error if we don't have a song name yet.
        if(!bHasSongName && !bFromSetArtist){
            this.setState({
                filepond: [],
                errorMessage: [
                    <div>
                        <ErrorMessage 
                            errorMessage="You must enter a song name to continue to mp3 upload." 
                            key={1}/>
                            
                    </div>
                ]
            });
        }

        // Show error for when songName has value, but artist doesn't
        else if(bHasSongName && bFromSetArtist && !bHasArtist){
            this.setState({
                filepond: [],
                errorMessage: [
                    <div>
                        <ErrorMessage 
                            errorMessage="You must enter artist to continue to mp3 upload." 
                            key={1}/>
                    </div>
                ]
            });
        }

        else {
            this.setState({
                errorMessage: []
            })
        }
    }
}

setUploadURL(){
    const baseURL = "http://localhost:3000/mediaHandler/";
    const songFileName = this.state.songName;
    const bandName = this.state.artist;

    this.setState({
        uploadURL: baseURL + songFileName + "/" + bandName
    });
}

  handleSongName(songName){
      this.setState({
        songName: songName
      }, () => {
          this.setFilePondObject(false);
      })
  }

  handleArtist(artist){
      this.setState({
          artist: artist
      }, () => {
          this.setFilePondObject(true);
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
        {this.state.errorMessage}
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

        {this.state.filepond}
      </div>
    );
  }
}

export default AudioUpload;