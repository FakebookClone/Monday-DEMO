import React from 'react';
import Axios from 'axios';
import ReadFriends from './ReadFriends.jsx';

export default class CreateFriend extends React.Component {

  constructor() {
    super()
    this.state = {
      friends: [],
      first_name: '',
      last_name: ''
    }
  }

	render() {
		return (
			<div>
				<input onChange={this.first_nameCatcher.bind(this)} type='text' value={this.state.first_name} placeholder='first name'/>
				<br/>
				<input onChange={this.last_nameCatcher.bind(this)} type='text' value={this.state.last_name} placeholder='last name'/>
				<br/>
				<button onClick={this.createFriend.bind(this)}>Create Friend</button>
			</div>
		)
	}

  first_nameCatcher(e) {
    this.setState({
      first_name: e.target.value
    })
  }

  last_nameCatcher(e) {
    this.setState({
      last_name: e.target.value
    })
  }

  createFriend() {
    Axios({
      method: 'POST',
      url: 'http://localhost:3000/api/friends',
      data: {
        first_name: this.state.first_name,
        last_name: this.state.last_name
      }
    }).then(r => {
      this.props.update(r.data);
      this.setState({first_name: '', last_name: ''});
    })
  }

  updateFriends(friends) {
    this.setState({friends: friends});
  }
}
