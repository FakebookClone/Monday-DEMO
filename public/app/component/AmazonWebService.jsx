import React from 'react';
import Axios from 'axios';

export default class AmazonWebService extends React.Component {
  constructor() {
    super()
    this.state = { file: null, processing: false, uploaded_uri: null }
  }

  render() {
    return (
      <div>
        <p>Amazon Web Service Component</p>
        <input onChange={this.fileCatcher.bind(this)} type="file" images="images" accept="image/*" />
        <button onClick={this.handleSubmit.bind(this)}>Upload</button>
        {this.state.processing
          ? <p>Processing.. please wait</p>
          : null
        }
        {this.state.location
          ? <img src={this.state.location} />
          : null
        }
      </div>
    )
  }

  fileCatcher(e) {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = (upload) => {
      this.setState({
        file: {
          imageBody: upload.target.result,
          imageName: file.name,
          imageExtension: file.type,
          userEmail: 'webdev.jameslemire@gmail.com'
        }
      });
    };

    reader.readAsDataURL(file);
  }

  handleSubmit(e) {
    this.setState({
      processing: true
    });

    Axios.post('http://localhost:3000/api/pictureUpload', {file: this.state.file}).then( r => {
      this.setState({
        processing: false,
        location: r.data.Location
      })
    })
  }
}
