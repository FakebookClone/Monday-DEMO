import React from 'react';
import Axios from 'axios';
import DeleteFriend from './DeleteFriend.jsx';

export default class ReadFriends extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h1>Friends List</h1>
        <ul>
          {this.props.friends.map( (value, index) => {
            return (
              <div>
                <li className='same-line' key={index}>{value.first_name} {value.last_name}</li>
                <DeleteFriend person={value.friend_id} update={this.props.update} />
              </div>
            )
          })}
        </ul>
      </div>
    )
  }
}
