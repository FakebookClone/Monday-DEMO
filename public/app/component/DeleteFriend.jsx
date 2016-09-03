import React from 'react';
import Axios from 'axios';

export default class DeleteFriend extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className='same-line'>
        <button onClick={this.deleteFriend.bind(this)} >Delete Friend</button>
      </div>
    )
  }

  deleteFriend() {
    Axios({
      method: 'DELETE',
      url: `http://localhost:3000/api/friend/${this.props.person}`
    }).then( r => { this.props.update(r.data) })
  }
}
