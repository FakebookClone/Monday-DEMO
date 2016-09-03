import React from 'react';
import FacebookLogin from 'react-facebook-login';

require('../../styles/facebook.scss');

export default class FbLogin extends React.Component {
  constructor(props) {
    super(props)
    this.state = { user: JSON.parse(localStorage.getItem('fakebook_user')) }
  }

  responseFacebook(response) {
    console.log(response);
    localStorage.setItem('fakebook_user', JSON.stringify(response));
    this.setState({ user: JSON.parse(localStorage.getItem('fakebook_user')) });
  }

  render() {
    return (
      <div>
        {this.state.user
          ? <div>
              <img src={this.state.user.picture.data.url} />
              <button onClick={this.logout.bind(this)}>Logout</button>
            </div>
          : <FacebookLogin
              appId="145051979269944"
              autoLoad={false}
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
    localStorage.clear();
    this.setState({ user: null })
  }
}
