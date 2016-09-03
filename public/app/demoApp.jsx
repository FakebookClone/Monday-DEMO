import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router';
import Axios from 'axios';
import CreateFriend from './component/CreateFriend.jsx';
import ReadFriends from './component/ReadFriends.jsx';
import DeleteFriend from './component/DeleteFriend.jsx';
require('../styles/main.css');

class App extends React.Component {

	constructor() {
		super();
		this.state = { friends: [] }
	}

	componentWillMount() {
    Axios.get('/api/friends').then(r => {
      this.setState({ friends: r.data} );
    })
  }

  shouldComponentUpdate() {
    Axios.get('/api/friends').then(r => {
      if(this.state.friends.length !== r.data.length) {
        this.setState({ friends: r.data });
      }
    })

    return true;
  }

	render() {
		return (
  		<div>
  			<p>Welcome to App</p>
        <CreateFriend update={this.updateFriends.bind(this)} />
				<ReadFriends update={this.updateFriends.bind(this)} friends={this.state.friends} />
  		</div>
		)
	}

	updateFriends(friends) {
		this.setState({ friends: friends })
	}
}

ReactDOM.render(
	<App/>, document.getElementById('app'));
