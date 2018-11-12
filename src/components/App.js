import React, { Component } from 'react';



class App extends Component {
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
        </div>
      </div>

    );
  }
}

export default App;
