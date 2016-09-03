import React from 'react';
import Axios from 'axios';

export default class ReadFriends extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>Friends List</h1>
        <ul>
          {this.props.friends.map( (value, index) => {
            return (
              <li key={index}>{value.first_name} {value.last_name}</li>
            )
          })}
        </ul>
      </div>
    )
  }
}
