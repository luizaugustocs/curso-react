import React, { Component } from 'react';

class Perfil extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.match.params.id}</h2>
      </div>
    );
  }
}

export default Perfil;
