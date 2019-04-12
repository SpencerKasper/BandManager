import React from 'react';
import InputItemGroup from '../AppComponents/InputItemGroup';
import { Form, Button } from 'reactstrap';
import AppHeader from '../AppComponents/AppHeader';
import {FilePond, registerPlugin} from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import './AudioUpload.css';
import FilePondPluginFileMetadata from 'filepond-plugin-file-metadata';
import ErrorMessage from '../Error/ErrorMessage';
import Axios from 'axios';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';

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
        errorMessage: [],
        files: []
    };

    this.setUploadURL = this.setUploadURL.bind(this);
    this.handleSongName = this.handleSongName.bind(this);
    this.handleArtist = this.handleArtist.bind(this);
    this.handleGenre = this.handleGenre.bind(this);
    this.setMetadata = this.setMetadata.bind(this);
    this.handleInit = this.handleInit.bind(this);
}

setMetadata(){
    const trackID = "5cacf1bf497bc34b04122328";

    Axios.post("http://localhost:3000/metadataHandler/" + trackID, {
        "songName": this.state.songName,
        "bandName": this.state.artist,
        "genre": this.state.genre
    }).then(response => {
        alert("Added item");
    })
}

handleInit(){
    console.log("File pond instance has been initialized", this.pond);
}

/*
 *  bFromSetArtist is used to tell us if this function call came from setting
 *  the artist or from setting the song name.
 */
setFilePondObject(bFromSetArtist){
    const bHasSongName = this.state.songName !== "" ? true : false;
    const bHasArtist = this.state.artist !== "" ? true : false;

    if(bHasSongName && bHasArtist){
        const getUploadParams = ({meta}) => {
            alert(this.state.uploadURL);
            return {
                url: this.state.uploadURL
            }
        }
    
        const handleChangeStatus = ({meta, file}, status) => {
            console.log(status, meta, file);
        }
    
        const handleSubmit = (files, allFiles) => {
            console.log(files.map(f => f.meta));
            allFiles.forEach(f => f.remove());
        }

        this.setState({
            filepond: [
                    <FilePond 
                        key="1"
                        ref={ref => this.pond = ref}
                        name={"track"} 
                        server={{
                            process: this.state.uploadURL
                        }}
                        oninit={() => this.handleInit()}
                        />,
                        <Dropzone 
                            getUploadParams={getUploadParams}
                            onChangeStatus={handleChangeStatus}
                            onSubmit={handleSubmit}/>
            ],
            errorMessage: []   
        }, () => {
            
        })
    } else if(!bHasSongName && !bFromSetArtist){
        // Show error if we don't have a song name yet.
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

setUploadURL(bFromSetArtist){
    const baseURL = "http://localhost:3000/mediaHandler/";
    const songFileName = this.state.songName;
    const bandName = this.state.artist;

    this.setState({
        uploadURL: baseURL + songFileName + "/" + bandName
    }, () => {
        this.setFilePondObject(bFromSetArtist);
    });
}

  handleSongName(songName){
      this.setState({
        songName: songName
      }, () => {
        this.setUploadURL(false);
      })
  }

  handleArtist(artist){
      this.setState({
          artist: artist
      }, () => {
          this.setUploadURL(true);
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
        <Form className="AudioUploadForm">
            <InputItemGroup
                overrideClass="InputItem"
                labelName={"Song Name:"}
                inputType={"text"}
                placeholder={"Enter your song name here."}
                errorMessage={""}
                shareItemValue={this.handleSongName}
            />

            <InputItemGroup
                overrideClass="InputItem"
                labelName={"Artist:"}
                inputType={"text"}
                placeholder={"Enter artist here."}
                errorMessage={""}
                shareItemValue={this.handleArtist}
            />

            <div>
            <InputItemGroup
                overrideClass="InputItem"
                labelName={"Genre:"}
                inputType={"text"}
                placeholder={"Enter the genre of your song here."}
                errorMessage={""}
                shareItemValue={this.handleGenre}
            />
            </div>
        </Form>

        {this.state.filepond}
      </div>
    );
  }
}

export default AudioUpload;