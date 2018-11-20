import React, { Component } from 'react';

const axios = require('axios')




class App extends Component {

  constructor() {
    super()
    this.state = {
      userName: "",
      password: ""
    }
  }

  setUserName(e) {
    let userName = e.target.value
    this.setState({ userName })
  }

  setPassword(e) {
    let password = e.target.value
    this.setState({ password })
  }

  btnClick() {
    //console.log("Username: " + this.state.userName + "\nPassword: " + this.state.password);
    axios.
      axios.post('http://localhost:3001', {
        firstName: this.state.userName,
        passWord: this.state.password
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }





  render() {

    return (
      <div className="row">
        <div className="col-md-4 col-lg-offset-4">
          <h3>Login</h3>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Brugernavn"
              onChange={(e) => this.setUserName(e)}
              onKeyPress={this._handleKeyPress} />
          </div>
          <div className="form-group">
            <input type="password" className="form-control" placeholder="Kodeord"
              onChange={(e) => this.setPassword(e)}
              onKeyPress={this._handleKeyPress} />

          </div>
          <button onClick={() => this.btnClick()}>click me</button>
        </div>

        <div>

        </div>


      </div>

    );
  }
}

export default App;
