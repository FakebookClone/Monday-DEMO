import React from 'react';
import FacebookLogin from 'react-facebook-login';

require('../../styles/facebook.scss');

export default class FbLogin extends React.Component {
  constructor(props) {
    super(props)
    this.state = { user: null, loggedIn: false }
  }

  responseFacebook(response) {
    console.log(response);
    this.setState({ user: response, loggedIn: !this.state.loggedIn });
  }

  render() {
    console.log(this.state.user);
    return (
      <div>
        {this.state.user
          ? <div>
              <img src={this.state.user.picture.data.url} />
              <button onClick={this.logout.bind(this)}>Logout</button>
            </div>
          : <FacebookLogin
              appId="145051979269944"
              autoLoad={this.state.loggedIn}
              fields="name,email,picture"
              cssClass="test"
              textButton="We have the power Michael!"
              callback={this.responseFacebook.bind(this)}
            />
        }
      </div>
    )
  }

  logout() {
    console.log('hit');
    this.setState({ user: null, loggedIn: !this.state.loggedIn })
  }
}
