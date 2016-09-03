import React from 'react';
import Axios from 'axios';
import DeleteFriend from './DeleteFriend.jsx';
import EditFriend from './EditFriend.jsx';

export default class ReadFriends extends React.Component {
  constructor() {
    super();
    this.state = { editId: null, showEdit: false, showEditButton: true }
  }

  render() {
    console.log('edit id', this.state.editId);
    return (
      <div>
        <h1>Friends List</h1>
        <ul>
          {this.props.friends.map( (value, index) => {
            return (
              <div>
                <li className='same-line' key={value.friend_id}>{value.first_name} {value.last_name}
                <EditFriend editId={this.state.editId} toggleId={this.updateEditId.bind(this)} editValues={ {showEdit: this.state.showEdit, showEditButton: this.state.showEditButton} } toggle={this.toggleEdit.bind(this)} person={value} update={this.props.update} />
                <DeleteFriend toggle={this.toggleEdit.bind(this)} person={value.friend_id} update={this.props.update} /></li>
              </div>
            )
          })}
        </ul>
      </div>
    )
  }

  updateEditId(id) {
    this.setState({ editId: id });
  }

  toggleEdit() {
    this.setState({ showEdit: !this.state.showEdit, showEditButton: !this.state.showEditButton })
  }
}
