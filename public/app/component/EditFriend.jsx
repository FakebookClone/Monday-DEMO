import React from 'react';
import Axios from 'axios';

export default class EditFriend extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      first_name: this.props.person.first_name,
      last_name: this.props.person.last_name
    }
  }

  render() {
    return (
      <div className="same-line">
        {this.props.editValues.showEditButton
          ? <button onClick={ () => { this.props.toggleId(this.props.person.friend_id); this.props.toggle(); }}>Edit</button>
          : null
        }
        {this.props.editId === this.props.person.friend_id
          ? <div className="same-line">
              <input onChange={this.first_nameCatcher.bind(this)} className="same-line" value={this.state.first_name} />
              <input onChange={this.last_nameCatcher.bind(this)} className="same-line" value={this.state.last_name} />
              <button onClick={this.saveEdit.bind(this)} className="same-line">Save</button>
            </div>
          : null
        }
      </div>
    )
  }

  first_nameCatcher(e) {
    this.setState({ first_name: e.target.value });
  }

  last_nameCatcher(e) {
    this.setState({ last_name: e.target.value });
  }

  saveEdit() {
    Axios.put(`/api/friend/${this.props.person.friend_id}`, {first_name: this.state.first_name, last_name: this.state.last_name}).then( r => {
      this.props.update(r.data);
      this.props.toggleId(null)
      this.props.toggle();
    })
  }
}
